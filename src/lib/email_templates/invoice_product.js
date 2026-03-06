export function createInvoiceProduct(
    num_of_pieces, 
    product_name, 
    hs_code, 
    qty, 
    item_price, 
    total_for_item
){
    return `<tr>
            <td class="gen-first-column">
                <p class="MsoNormal">
                    ${num_of_pieces}
                </p>
            </td>
            <td class="gen-second-column">
                <p class="MsoNormal">
                    ${product_name}
                </p>
            </td>
            <td class="first-column">
                <p class="MsoNormal">
                    ${hs_code}
                </p>
            </td>
            <td class="gen-first-column">
                <p class="MsoNormal">
                    ${qty}
                </p>
            </td>
            <td class="gen-first-column">
                <p class="MsoNormal">
                    ${item_price}
                </p>
            </td>
            <td class="gen-first-column">
                <p class="MsoNormal">
                    ${total_for_item}
                </p>
            </td>
        </tr>
    `
};