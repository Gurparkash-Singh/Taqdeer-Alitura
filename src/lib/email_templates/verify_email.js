export function createVerifyEmail(code) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://taqdeeralitura.com/Logo.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style="background-color:#ffffff;margin:0 auto;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Confirm your email address
    </div>
    <center>
        <img
            alt="Taqdeer Alitura Logo"
            src="https://taqdeeralitura.com/Logo.png"
            style="display:block;outline:none;border:none;text-decoration:none"
            width="143"
            height="81"
        />
    </center>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin:0 auto;padding:0px 20px">
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
              style="margin-top:32px">
              <tbody>
                <tr>
                  <td>
                    
                  </td>
                </tr>
              </tbody>
            </table>
            <h1
              style="color:#1d1c1d;font-size:36px;font-weight:700;margin:30px 0;padding:0;line-height:42px">
              Confirm your email address
            </h1>
            <p
              style="font-size:20px;line-height:28px;margin-bottom:30px;margin-top:16px">
              Your confirmation code is below - enter it in your open browser
              window and we&#x27;ll help you get verified.
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background:rgb(245, 244, 245);border-radius:4px;margin-bottom:30px;padding:40px 10px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:30px;line-height:24px;text-align:center;vertical-align:middle;margin-top:16px;margin-bottom:16px">
                      ${code}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:14px;color:#000;">
              This code will expire in 5 minutes.
            </p>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" class="footer" style="font-size:0.8em">
                <tbody>
                    <tr>
                        <td>
                            <br />
                            <hr class="divider" style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                            <p class="" style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;text-align:left">
                                <span>You are receiving this email because you requested a code on our website.</span><br /><br /><span>If you didn&#x27;t request this email, there&#x27;s nothing to worry about, you can safely ignore it.</span>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="" style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;text-align:left"></p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
}
