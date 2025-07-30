export function createReceiptProduct(name, alt_desc, image, amount, size) {
    const product = `<hr class="divider" style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
            <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="padding-left:40px;padding-right:40px;padding-top:40px;padding-bottom:40px">
                <tbody>
                <tr>
                    <td>
                    <table
                        align="center"
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation">
                        <tbody style="width:100%">
                        <tr style="width:100%">
                            <td>
                            <img
                                alt="${alt_desc}"
                                src="${image}"
                                style="display:block;outline:none;border:none;text-decoration:none;float:left"
                                width="260px" />
                            </td>
                            <td
                            style="vertical-align:top;padding-left:12px">
                            <p
                                style="font-size:14px;line-height:2;margin:0;font-weight:500;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                                ${name}
                            </p>
                            <p
                                style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                                Quantity: ${amount}
                            </p>
                            <p
                                style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                                ${size}
                            </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>
`
    const preloader = `<link
      rel="preload"
      as="image"
      href="${image}" />`
    
    return {preloader: preloader, product: product};
}