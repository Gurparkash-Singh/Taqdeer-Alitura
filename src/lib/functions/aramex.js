import axios from "axios";

const clientInfo = {
    UserName: "testingapi@aramex.com",
    Password: "R123456789$r",
    Version: "v1.0",
    AccountNumber: "4004636",
    AccountPin: "442543",
    AccountEntity: "RUH",
    AccountCountryCode: "SA"
};

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
    }
}