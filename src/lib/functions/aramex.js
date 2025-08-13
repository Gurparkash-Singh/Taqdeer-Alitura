import axios from 'axios';

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

// const clientInfo = {
//     Version: "v1.0",
//     UserName: "testingapi@aramex.com",
//     Password: "R123456789$r",
//     AccountNumber: "4004636",
//     AccountPin: "442543",
//     AccountEntity: "RUH",
//     AccountCountryCode: "SA"
// };

const clientInfo = {
	Version: 'v1.0',
	UserName: 'fandeejani2002@gmail.com',
	Password: 'Mysoon@2000',
	AccountNumber: '72467199',
	AccountPin: '466529',
	AccountEntity: 'RUH',
	AccountCountryCode: 'SA'
};

export const aramex = {
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
				Dimensions: null,
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
			url: 'https://ws.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/xml/CalculateRate',
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
		// Shipping Date = The date Aramex receives the shipment to be shipped out.
		// Due Date = The date specified for shipment to be delivered to the consignee.
		// Customs Value = Value of the item
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
						Dimensions: null,
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
					TransportType: 0
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
			url: 'https://ws.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/xml/CreateShipments',
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
