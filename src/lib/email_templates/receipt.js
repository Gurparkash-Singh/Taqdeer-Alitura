export function createReceipt(
	preload,
	tracking_number,
	tracking_link,
	user_name,
	address,
	products,
	order_number,
	order_date
) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://taqdeeralitura.com/Logo.png" />
    ${preload}
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      Get your order summary, estimated delivery date and more
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:100%;margin:10px auto;width:600px;">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding:22px 40px;background-color:#F7F7F7">
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
                            <p
                              style="font-size:14px;line-height:2;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                              Tracking Number
                            </p>
                            <p
                              style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F;margin-top:12px;margin-right:0;margin-bottom:0;margin-left:0">
                              ${tracking_number}
                            </p>
                          </td>
                          <td align="right">
                            <a
                              style="color:#000;text-decoration-line:none;border:1px solid #929292;font-size:16px;text-decoration:none;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500"
                              target="_blank"
                              href='${tracking_link}'
                              >Track Package</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding:40px 74px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Taqdeer Alitura Logo"
                      height="81"
                      src="https://taqdeeralitura.com/Logo.png"
                      style="display:block;outline:none;border:none;text-decoration:none;margin:auto"
                      width="143" />
                    <h1
                      style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">
                      It&#x27;s On Its Way.
                    </h1>
                    <p
                      style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      You order&#x27;s is on its way. Use the link above to
                      track its progress.
                    </p>
                    <p
                      style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px;margin-bottom:0;margin-left:0;margin-right:0">
                      We&#x27;ve also charged your payment method for the cost of
                      your order.
                      For payment details, please visit your Orders page on
                      taqdeeralitura.com.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr class="divider" style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:15px;line-height:2;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      Shipping to: ${user_name}
                    </p>
                    <p
                      style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      ${address}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            ${products}
            <hr class="divider" style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="display:inline-flex;margin-bottom:40px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td
                            style="width:170px">
                            <p
                              style="font-size:14px;line-height:2;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                              Order Number
                            </p>
                            <p
                              style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F;margin-top:12px;margin-right:0;margin-bottom:0;margin-left:0">
                              ${order_number}
                            </p>
                          </td>
                          <td data-id="__react-email-column">
                            <p
                              style="font-size:14px;line-height:2;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                              Order Date
                            </p>
                            <p
                              style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F;margin-top:12px;margin-right:0;margin-bottom:0;margin-left:0">
                              ${order_date}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center">
                            <a
                              style="color:#000;text-decoration-line:none;border:1px solid #929292;font-size:16px;text-decoration:none;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500"
                              target="_blank"
                              href='${tracking_link}'
                              >Order Status</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding-top:22px;padding-bottom:22px">
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
                          <p
                            style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                            Please contact us if you have any questions. (If you
                            reply to this email, we won&#x27;t be able to see
                            it.)
                          </p>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p
                            style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                            © 2025 Taqdeer Alitura. All Rights Reserved.
                          </p>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>`;
}
