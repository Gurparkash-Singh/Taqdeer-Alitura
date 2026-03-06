export function createInvoiceTemplate(
	name,
	address,
	telephone,
	country,
	tracking_id,
	products,
	total_amount,
	date
) {
	return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin-left: 50pt;
            word-wrap: break-word;
        }

        p.MsoNormal,
        li.MsoNormal,
        div.MsoNormal {
            margin: 0cm;
            font-size: 10.0pt;
            font-family: "Times New Roman", serif;
        }

        p.MsoHeader,
        li.MsoHeader,
        div.MsoHeader {
            margin: 0cm;
            font-size: 10.0pt;
            font-family: "Times New Roman", serif;
        }

        p.MsoFooter,
        li.MsoFooter,
        div.MsoFooter {
            margin: 0cm;
            font-size: 10.0pt;
            font-family: "Times New Roman", serif;
        }

        p.MsoTitle,
        li.MsoTitle,
        div.MsoTitle {
            margin: 0cm;
            text-align: center;
            font-size: 20.0pt;
            font-family: "Arial", sans-serif;
            font-weight: bold;
        }

        pre {
            margin: 0cm;
            margin-bottom: .0001pt;
            font-size: 10.0pt;
            font-family: "Courier New";
        }

        p.MsoAcetate,
        li.MsoAcetate,
        div.MsoAcetate {
            margin: 0cm;
            font-size: 9.0pt;
            font-family: "Segoe UI", sans-serif;
        }

        span.HeaderChar {
            font-family: "Times New Roman", serif;
        }

        span.TitleChar {
            font-family: "Arial", sans-serif;
            font-weight: bold;
        }

        span.BalloonTextChar {
            font-family: "Segoe UI", sans-serif;
        }

        span.FooterChar {
            font-family: "Times New Roman", serif;
        }

        span.HTMLPreformattedChar {
            font-family: "Courier New";
        }

        .MsoChpDefault {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        .MsoPapDefault {
            margin-bottom: 10.0pt;
            line-height: 115%;
        }

        table.MsoNormalTable {
            line-height: 115%;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #header-table {
            margin-left: -22.0pt;
        }

        #header-table p {
            text-align: left;
            font-size: 11.0pt;
            font-family: 'Calibri', sans-serif;
        }

        #header-table .first-column {
            width: 257pt;
        }

        #table1-title {
            margin-left: -20.0pt;
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table1 {
            margin-left: -12.6pt;
            border-collapse: collapse;
            border: none;
            width: 690px;
        }

        #table1 .first-column {
            width: 90.0pt;
            border: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt
        }

        #table1 .first-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
            text-align: left;
            margin: 0cm;
            font-weight: bold;
        }

        #table1 .second-column {
            width: 162.0pt;
            border: solid 1.0pt;
            border-left: none;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table2-title {
            margin-left: -20.0pt;
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table2 {
            margin-left: -12.6pt;
            border-collapse: collapse;
            border: none;
            width: 690px;
        }

        #table2 .first-column {
            width: 99.0pt;
            border: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table2 .first-column p {
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table2 .second-column {
            width: 153.0pt;
            border: solid 1.0pt;
            border-left: none;
            padding: 0cm 5.4pt 0cm 5.4pt
        }

        #table2 .second-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table3-title {
            margin-left: -20.0pt;
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table3 {
            margin-left: -12.6pt;
            border-collapse: collapse;
            border: none;
            width: 690px;
        }

        #table3 .first-column {
            width: 67.5pt;
            border: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt;
            height: 44.5pt;
        }

        #table3 .first-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table3 .second-column {
            width: 189.0pt;
            border: solid 1.0pt;
            border-left: none;
            padding: 0cm 5.4pt 0cm 5.4pt;
            height: 44.5pt;
        }

        #table3 .second-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table3 .gen-first-column {
            width: 67.5pt;
            border: solid 1.0pt;
            border-top: none;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table3 .gen-first-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
            color: black;
            text-align: center;
        }

        #table3 .gen-second-column {
            width: 189.0pt;
            border-top: none;
            border-left: none;
            border-bottom: solid 1.0pt;
            border-right: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table3 .gen-second-column p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
            color: black;
            text-align: center;
        }

        #table4 {
            width: 306px;
            margin-left: 275.4pt;
            border-collapse: collapse;
            border: none;
        }

        #table4 p {
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table4 .first-column {
            width: 94.5pt;
            border: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt;
            height: 19.75pt;
        }

        #table4 .second-column {
            width: 135.0pt;
            border: solid 1.0pt;
            border-left: none;
            padding: 0cm 5.4pt 0cm 5.4pt;
            height: 19.75pt;
        }

        #table5 {
            width: 690px;
            margin-left: -12.6pt;
            border-collapse: collapse;
            border: none;
        }

        #table5 p {
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #table5 .first-column {
            width: 153.0pt;
            border: solid 1.0pt;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table5 .second-column {
            width: 364.5pt;
            border: solid 1.0pt;
            border-left: none;
            padding: 0cm 5.4pt 0cm 5.4pt;
        }

        #table5 .second-column p {
            color: red;
        }

        #table5-footer {
            margin-left: -20.0pt;
            text-align: left;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #signature {
            margin-left: -20.0pt;
            width: 700px;
            text-align: right;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }

        #date {
            margin-left: -20.0pt;
            width: 700px;
            text-align: right;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
        }
    </style>
</head>

<body>
    <table id="header-table">
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Shipper Information
                </p>
            </td>
            <td>
                <p class="MsoTitle">
                    Consignee Information
                </p>
            </td>
        </tr>
    </table>

    <table class="MsoNormalTable" id="table1">
        <tr>
            <td class="first-column">
                <p class="MsoTitle" style='text-align:left'>
                    Name
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    Faris Andeejani
                </p>
            </td>
            <td class="first-column">
                <p class=MsoTitle style='text-align:left'>
                    Name
                </p>
            </td>
            <td class="second-column">
                <p class=MsoNormal>
                    ${name}
                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle" style='text-align:left'>
                    Address
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    12444, RHHA8775 Al Shairah
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle" style='text-align:left'>
                    Address
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    ${address}
                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle" style='text-align:left'>
                    Telephone
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    +966 50 864 0294
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Telephone
                </p>
            </td>
            <td class="second-column">
                <p class=MsoNormal>
                    ${telephone}
                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Fax
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal"></p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Fax
                </p>
            </td>
            <td class="second-column">
                <p></p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">VAT Number</p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    310069613300003
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    VAT Number
                </p>
            </td>
            <td class="second-column">
                <p></p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Country
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    Kingdom of Saudi Arabia
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Country
                </p>
            </td>
            <td class="second-column">
                <p class="MsoNormal">
                    ${country}
                </p>
            </td>
        </tr>
    </table>

    <br>

    <p class="MsoTitle" id="table2-title">
        Shipping Information
    </p>

    <table class="MsoNormalTable" id="table2">
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    AWB Number
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    ${tracking_id}
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Date of Export
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">

                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Contents
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    Fashion
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Payment Mode
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    Online visa card
                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Country of origin
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    Saudi Arabia
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle"></p>
            </td>
            <td class="second-column">
                <p class="MsoTitle"></p>
            </td>
        </tr>
    </table>

    <br>

    <p class="MsoTitle" id="table3-title">
        Shipment Information
    </p>

    <table class="MsoNormalTable" id="table3">
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Number of Pieces
                </p>
            </td>
            <td class="second-column">
                <p class=MsoTitle>
                    Specification of Commodities
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    HS CODE
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    QTY
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Unit Price
                </p>
            </td>
            <td class="first-column">
                <p class="MsoTitle">
                    Amount
                </p>
            </td>
        </tr>
        ${products}
    </table>

    <br>

    <table class="MsoNormalTable" id="table4">
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Currency
                </p>
            </td>
            <td class="second-column">
                <p class=MsoTitle>
                    Total Amount
                </p>
            </td>
        </tr>
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    SAR
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    ${total_amount}
                </p>
            </td>
        </tr>
    </table>

    <br>

    <table class="MsoNormalTable" id="table5">
        <tr>
            <td class="first-column">
                <p class="MsoTitle">
                    Reason for Sending
                </p>
            </td>
            <td class="second-column">
                <p class="MsoTitle">
                    SALE
                </p>
            </td>
        </tr>
    </table>

    <br>

    <p class="MsoTitle" id="table5-footer">
        I hereby certify that the items listed above are true and correct
    </p>

    <br>
    <br>

    <p class="MsoTitle" id="signature">
        Signature <span style="margin-left: 5ch;">Faris Andeejani</span>
    </p>

    <p class="MsoTitle" id="signature">
        Date <span style="margin-left: 13.5ch;">${date}</span>
    </p>
</body>

</html>`;
}
