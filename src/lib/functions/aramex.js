import axios from "axios";

const clientInfo = {
    Version: "v1.0",
    UserName: "testingapi@aramex.com",
    Password: "R123456789$r",
    AccountNumber: "4004636",
    AccountPin: "442543",
    AccountEntity: "RUH",
    AccountCountryCode: "SA"
};

// Update Shipper Contact Details for create Shipment

// const clientInfo = {
//     Version: "v1.0",
//     UserName: "Autad Al Modan",
//     Password: "Mysoon@2000",
//     AccountNumber: "72467199",
//     AccountPin: "466529",
//     AccountEntity: "RUH",
//     AccountCountryCode: "SA"
// }

export const aramex = {
    calculateRate: async (line1, line2, city, state, postal, country) => {
        let data = {
            ClientInfo: clientInfo,
            DestinationAddress: {
                Line1: line1,
                Line2: line2,
                Line3: "",
                City: city,
                State: state,
                PostCode: postal,
                CountryCode: country
            },
            OriginAddress: {
                Line1: "8775 Al Shairah",
                Line2: "",
                Line3: "",
                PostCode: "12444",
                City: "Riyadh",
                State: "Riyadh Province",
                CountryCode: "SA"
            },
            PreferredCurrencyCode: "SAR",
            ShipmentDetails: {
                Dimensions: null,
                ActualWeight: {
                    Unit: "KG",
                    Value: 1
                },
                ChargeableWeight: null,
                DescriptionOfGoods: null,
                GoodsOriginCountry: null,
                NumberOfPieces: 1,
                ProductGroup: "DOM",
                ProductType: "ONP",
                PaymentType: "P",
                PaymentOptions: "",
                CustomsValueAmount: null,
                CashOnDeliveryAmount: null,
                InsuranceAmount: null,
                CashAdditionalAmount: null,
                CashAdditionalAmountDescription: null,
                CollectAmount: null,
                Services: "",
                Items: null,
                DeliveryInstructions: null
            }
        };

        let config = {
            method: 'post',
            url: 'https://ws.sbx.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate',
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
        email
    ) => {
        let data = {
            ClientInfo: clientInfo,
            Shipments: [{
                Shipper: {
                    AccountNumber: clientInfo.AccountNumber,
                    PartyAddress: {
                        Line1: "8775 Al Shairah",
                        Line2: "",
                        Line3: "",
                        City: "Riyadh",
                        StateOrProvinceCode: "RUH",
                        PostCode: "12444",
                        CountryCode: "SA"
                    },
                    Contact: {
                        PersonName: "Faris Andeejani",
                        CompanyName: "Taqdeer Alitura",
                        PhoneNumber1: "966571427069",
                        PhoneNumber2: "",
                        CellPhone: "966571427069",
                        EmailAddress: clientInfo.UserName,
                        Type: ""
                    }
                },
                Consignee: {
                    AccountNumber: "",
                    PartyAddress: {
                        Line1: line1,
                        Line2: line2,
                        Line3: "",
                        City: city,
                        StateOrProvinceCode: state,
                        PostCode: postal,
                        CountryCode: country
                    },
                    Contact: {
                        PersonName: name,
                        PhoneNumber1: country_code + phone_number,
                        PhoneNumber2: "",
                        CellPhone: country_code + phone_number,
                        EmailAddress: email,
                        Type: ""
                    }
                },
                ShippingDateTime: `\/Date(${Date.now().valueOf()})\/`,
                Details: {
                    Dimensions: null,
                    ActualWeight: {
                        Unit: "KG",
                        Value: 1
                    },
                    ChargeableWeight: null,
                    DescriptionOfGoods: null,
                    GoodsOriginCountry: null,
                    NumberOfPieces: 1,
                    ProductGroup: "DOM",
                    ProductType: "ONP",
                    PaymentType: "P",
                    PaymentOptions: "",
                    CustomsValueAmount: null,
                    CashOnDeliveryAmount: null,
                    InsuranceAmount: null,
                    CashAdditionalAmount: null,
                    CashAdditionalAmountDescription: null,
                    CollectAmount: null,
                    Services: "",
                    Items: null,
                    DeliveryInstructions: null
                },
                TransportType: 0
            }],
        };

        let config = {
            method: 'post',
            url: 'https://ws.sbx.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments',
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
}