const otpmailTemplate = (otp, otpExpiry) => {
    return ` <div style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#f4f6f8;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#111827; padding:18px; text-align:center;">
              <h2 style="color:#ffffff; margin:0; font-size:20px;">LADIES CORNER</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:30px; text-align:center;">

              <h3 style="margin:0 0 10px; color:#111827;">Verify Your Email</h3>

              <p style="color:#6b7280; font-size:14px; margin-bottom:25px;">
                Use the OTP below to complete your registration. This code will expire soon.
              </p>
              <div style="display:inline-block; padding:14px 28px; font-size:26px; font-weight:bold; letter-spacing:6px; color:#111827; background:#f3f4f6; border:2px dashed #d1d5db; border-radius:10px;">
                ${otp}
              </div>

              <div style="margin-top:20px; display:inline-block; padding:8px 16px; background:#fee2e2; color:#991b1b; border-radius:20px; font-size:12px; font-weight:bold;">
                ${otpExpiry}
              </div>
              <p style="margin-top:25px; font-size:12px; color:#9ca3af;">
                If you did not request this email, you can ignore it safely.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</div>`
}
module.exports = {otpmailTemplate}