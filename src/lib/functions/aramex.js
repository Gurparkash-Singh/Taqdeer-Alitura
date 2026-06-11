import { MODE } from '$env/static/private';
import { dbFunctions } from '$lib/db/database';
import axios from 'axios';

let url_start = 'https://ws.aramex.net/ShippingAPI.V2';

const taqdeerShipmentInfo = {
	Line1: '8775 Al Shairah',
	Line2: '',
	Line3: '',
	PostCode: '12444',
	City: 'Riyadh',
	State: 'Riyadh Province',
	CountryCode: 'SA',
	PersonName: 'Faris Andeejani',
	CompanyName: 'Autad Al Modan',
	PhoneNumber1: '9660503217416',
	PhoneNumber2: '',
	CellPhone: '9660503217416',
	EmailAddress: 'fandeejani2002@gmail.com',
	Type: ''
};

let clientInfo = {
	Version: 'v1.0',
	UserName: 'fandeejani2002@gmail.com',
	Password: 'Mysoon@2000',
	AccountNumber: '72467199',
	AccountPin: '466529',
	AccountEntity: 'RUH',
	AccountCountryCode: 'SA'
};

export const aramex = {
    calculateVolumetricWeight: (length, width, height) => {
        return (length * width * height) / 5000;
    },

    calculatePrice: (
        shipping_prices,
        num_items, 
        weight
    ) => {
        let price = 0;

        let calculatableWeight = 0;

        let volumetric_weight = aramex.calculateVolumetricWeight(20, 40, 10);

        if (weight > volumetric_weight) {
            calculatableWeight = weight;
        }
        else {
            calculatableWeight = volumetric_weight;
        }

        if (calculatableWeight <= 0.5){
            return parseFloat(shipping_prices.first_half_kg) * num_items;
        }

        if (calculatableWeight > 15) {
            const extraWeight = ((calculatableWeight - 15) * 1000) / 500;
            price += Math.ceil(extraWeight) * parseFloat(shipping_prices.additional_half_kg_over_15);

            calculatableWeight -= (calculatableWeight - 15)
        }

        if (calculatableWeight > 10){
            const extraWeight = ((calculatableWeight - 10) * 1000) / 500;
            price += Math.ceil(extraWeight) * parseFloat(shipping_prices.additional_half_kg_over_15);

            calculatableWeight -= (calculatableWeight - 10)
        }

        price += parseFloat(shipping_prices.first_half_kg);
        calculatableWeight -= 0.5;

        if (calculatableWeight > 0) {
            const extraWeight = Math.ceil((calculatableWeight * 1000) / 500)
            price += extraWeight * parseFloat(shipping_prices.additional_half_kg); 
        }

        return price;
    },

	calculateRate: async (
		line1,
		line2,
		city,
		state,
		postal,
		country,
		num_items,
		customs_value,
		weight
	) => {
		let data = {
			ClientInfo: clientInfo,
			DestinationAddress: {
				Line1: line1,
				Line2: line2,
				Line3: '',
				City: city,
				State: state,
				PostCode: postal,
				CountryCode: country
			},
			OriginAddress: {
				Line1: taqdeerShipmentInfo.Line1,
				Line2: taqdeerShipmentInfo.Line2,
				Line3: taqdeerShipmentInfo.Line3,
				PostCode: taqdeerShipmentInfo.PostCode,
				City: taqdeerShipmentInfo.City,
				State: taqdeerShipmentInfo.State,
				CountryCode: taqdeerShipmentInfo.CountryCode
			},
			PreferredCurrencyCode: 'SAR',
			ShipmentDetails: {
				Dimensions: {
					Length: 20,
					Width: 40,
					Height: 10,
					Unit: 'CM'
				},
				ActualWeight: {
					Unit: 'KG',
					Value: weight
				},
				ChargeableWeight: null,
				DescriptionOfGoods: null,
				GoodsOriginCountry: null,
				NumberOfPieces: num_items,
				PaymentType: 'P',
				PaymentOptions: '',
				CashOnDeliveryAmount: null,
				InsuranceAmount: null,
				CashAdditionalAmount: null,
				CashAdditionalAmountDescription: null,
				CollectAmount: null,
				Services: '',
				Items: null,
				DeliveryInstructions: null
			}
		};

		if (country === 'SA') {
			data.ShipmentDetails.ProductGroup = 'DOM';
			data.ShipmentDetails.ProductType = 'ONP';
			data.ShipmentDetails.CustomsValueAmount = null;
		} else {
			data.ShipmentDetails.ProductGroup = 'EXP';
			data.ShipmentDetails.ProductType = 'EPX';
			data.ShipmentDetails.CustomsValueAmount = {
				CurrencyCode: 'SAR',
				Value: customs_value
			};
		}

		let config = {
			method: 'post',
			url: `${url_start}/RateCalculator/Service_1_0.svc/xml/CalculateRate`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let result;

		try {
			result = await axios.request(config);
		} catch (error) {
			console.log(error);
		}

        if (result.data.HasErrors) {
            return result.data;
        }

        const [shopping_country] = await dbFunctions.getShoppingCountry(country.toUpperCase());

        if (!shopping_country) {
            result.data.HasErrors = true;

            result.data.Notifications = [{
                Message: "DestinationAddress - Invalid Country Code"
            }]

            return result.data;
        }

        let price = 0;

        if (shopping_country.province_dependant) {
            const [shipping_prices] = await dbFunctions.getShippingPriceByProvince(
                country,
                state
            )

            if (shipping_prices) {
                price = aramex.calculatePrice(
                    shipping_prices,
                    num_items, 
                    weight
                );
            }
        }

        const [shipping_prices] = await dbFunctions.getShippingPriceByCountry(country);

        if (!shipping_prices) {
            result.data.HasErrors = true;

            result.data.Notifications = [{
                Message: "ServerError - Error finding delivery rate"
            }]

            return result.data;
        }

         if (price == 0) {
            price = aramex.calculatePrice(
                shipping_prices,
                num_items, 
                weight
            );
        }

        result.data.TotalAmount.Value = price;

        return result.data;
	},

	createShipment: async (
		line1,
		line2,
		city,
		state,
		postal,
		country,
		name,
		country_code,
		phone_number,
		email,
		num_items,
		customs_value,
		weight
	) => {
		let data = {
			ClientInfo: clientInfo,
			Shipments: [
				{
					Shipper: {
						AccountNumber: clientInfo.AccountNumber,
						PartyAddress: {
							Line1: taqdeerShipmentInfo.Line1,
							Line2: taqdeerShipmentInfo.Line2,
							Line3: taqdeerShipmentInfo.Line3,
							City: taqdeerShipmentInfo.City,
							StateOrProvinceCode: taqdeerShipmentInfo.State,
							PostCode: taqdeerShipmentInfo.PostCode,
							CountryCode: taqdeerShipmentInfo.CountryCode
						},
						Contact: {
							PersonName: taqdeerShipmentInfo.PersonName,
							CompanyName: taqdeerShipmentInfo.CompanyName,
							PhoneNumber1: taqdeerShipmentInfo.PhoneNumber1,
							PhoneNumber2: taqdeerShipmentInfo.PhoneNumber2,
							CellPhone: taqdeerShipmentInfo.CellPhone,
							EmailAddress: taqdeerShipmentInfo.EmailAddress,
							Type: taqdeerShipmentInfo.Type
						}
					},
					Consignee: {
						AccountNumber: '',
						PartyAddress: {
							Line1: line1,
							Line2: line2,
							Line3: '',
							City: city,
							StateOrProvinceCode: state,
							PostCode: postal,
							CountryCode: country
						},
						Contact: {
							PersonName: name,
							CompanyName: name,
							PhoneNumber1: country_code + phone_number,
							PhoneNumber2: '',
							CellPhone: country_code + phone_number,
							EmailAddress: email,
							Type: ''
						}
					},
					ShippingDateTime: `\/Date(${Date.now().valueOf()})\/`,
					Details: {
						Dimensions: {
							Length: 20,
							Width: 40,
							Height: 10,
							Unit: 'CM'
						},
						ActualWeight: {
							Unit: 'KG',
							Value: weight
						},
						ChargeableWeight: null,
						DescriptionOfGoods: 'Clothing',
						GoodsOriginCountry: 'SA',
						NumberOfPieces: num_items,
						PaymentType: 'P',
						PaymentOptions: '',
						CashOnDeliveryAmount: null,
						InsuranceAmount: null,
						CashAdditionalAmount: null,
						CashAdditionalAmountDescription: null,
						CollectAmount: null,
						Services: '',
						Items: null,
						DeliveryInstructions: null
					},
					TransportType: 0,
					Attachments: {
						FileName: '',
						FileExtension: '',
						FileContents: ''
					}
				}
			],
			LabelInfo: {
				ReportID: 9729,
				ReportType: 'URL'
			}
		};

		if (country === 'SA') {
			data.Shipments[0].Details.ProductGroup = 'DOM';
			data.Shipments[0].Details.ProductType = 'ONP';
			data.Shipments[0].Details.CustomsValueAmount = null;
		} else {
			data.Shipments[0].Details.ProductGroup = 'EXP';
			data.Shipments[0].Details.ProductType = 'EPX';
			data.Shipments[0].Details.CustomsValueAmount = {
				CurrencyCode: 'SAR',
				Value: customs_value
			};
		}

		let config = {
			method: 'post',
			url: `${url_start}/Shipping/Service_1_0.svc/xml/CreateShipments`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let result;

		try {
			result = await axios.request(config);
		} catch (error) {
			console.log(error);
		}

		return result.data;
	},

	trackShipment: async (shipments) => {
		let data = {
			ClientInfo: clientInfo,
			Shipments: shipments,
			GetLastTrackingUpdateOnly: true
		};

		let config = {
			method: 'post',
			url: `${url_start}/Tracking/Service_1_0.svc/xml/TrackShipments`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let result;

		try {
			result = await axios.request(config);
		} catch (error) {
			console.log(error);
		}

		return result.data;
	},

	printLabel: async (shipment) => {
		let data = {
			ClientInfo: clientInfo,
			ShipmentNumber: shipment,
			LabelInfo: {
				ReportID: 9729,
				ReportType: 'URL'
			}
		};

		let config = {
			method: 'post',
			url: `${url_start}/Shipping/Service_1_0.svc/json/PrintLabel`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let result;

		try {
			result = await axios.request(config);
		} catch (error) {
			console.log(error);
		}

		return result.data;
	}
};
