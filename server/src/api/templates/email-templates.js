/**
 * Order confirmation email template
 * @param {Object} data - Template data
 * @returns {string} HTML email template
 */
export const orderConfirmationTemplate = (data) => {
    const { t, order, orderDate, productsHTML, subtotal, discount, total } = data;
    
    return `
<!DOCTYPE html>
<html lang="${data.locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd;">
        
        <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #ffffff; border-bottom: 2px solid #000000;">
                <img src="${process.env.LOGO_URL || 'https://raw.githubusercontent.com/BlendiGR/Restaurant-App/refs/heads/stripe/client/src/assets/images/Fooder-Logo-Black.png'}" 
                     alt="Fooder Logo" 
                     style="max-width: 180px; height: auto; display: block; margin: 0 auto;" />
            </td>
        </tr>
        
        <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #C73228;">
                <h1 style="margin: 0; font-size: 24px; color: #ffffff !important;">${t.title}</h1>
            </td>
        </tr>

        <tr>
            <td style="padding: 30px 20px; background-color: #ffffff;">
                
                <p style="margin: 0 0 15px; font-size: 16px; color: #000000 !important;">
                    ${t.greeting}
                </p>
                <p style="margin: 0 0 25px; font-size: 14px; color: #666666 !important;">
                    ${t.intro}
                </p>

                <table width="100%" cellpadding="10" cellspacing="0" border="0" style="margin-bottom: 25px; background-color: #f9f9f9; border: 1px solid #ddd;">
                    <tr>
                        <td style="font-size: 14px; color: #666666 !important;">${t.orderNumber}:</td>
                        <td style="font-size: 14px; font-weight: bold; text-align: right; color: #000000 !important;">#${order.orderId}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 14px; color: #666666 !important;">${t.orderDate}:</td>
                        <td style="font-size: 14px; text-align: right; color: #000000 !important;">${orderDate}</td>
                    </tr>
                </table>

                ${order.destinationAddress ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="margin: 0 0 10px; font-size: 16px; color: #000000 !important;">${t.deliveryAddress}</h3>
                    <p style="margin: 0; font-size: 14px; color: #666666 !important; line-height: 1.5;">
                        ${order.user?.username || ''}<br>
                        ${order.destinationAddress}
                    </p>
                </div>
                ` : ''}

                <h3 style="margin: 0 0 15px; font-size: 16px; color: #000000 !important;">${t.orderDetails}</h3>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; border: 1px solid #ddd; background-color: #ffffff;">
                    <thead>
                        <tr style="background-color: #f9f9f9;">
                            <th style="padding: 10px; text-align: left; font-size: 14px; border-bottom: 1px solid #ddd; color: #000000 !important;">${t.product}</th>
                            <th style="padding: 10px; text-align: center; font-size: 14px; border-bottom: 1px solid #ddd; width: 60px; color: #000000 !important;">${t.quantity}</th>
                            <th style="padding: 10px; text-align: right; font-size: 14px; border-bottom: 1px solid #ddd; width: 100px; color: #000000 !important;">${t.price}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHTML}
                    </tbody>
                </table>

                <table width="100%" cellpadding="8" cellspacing="0" border="0" style="margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 14px; color: #666666 !important; text-align: right;">${t.subtotal}:</td>
                        <td style="font-size: 14px; font-weight: bold; text-align: right; width: 100px; color: #000000 !important;">€${subtotal.toFixed(2)}</td>
                    </tr>
                    ${discount > 0 ? `
                    <tr>
                        <td style="font-size: 14px; color: #666666 !important; text-align: right;">${t.discount}:</td>
                        <td style="font-size: 14px; font-weight: bold; text-align: right; color: #000000 !important;">-€${discount.toFixed(2)}</td>
                    </tr>
                    ` : ''}
                    <tr style="border-top: 2px solid #000;">
                        <td style="padding-top: 12px; font-size: 16px; font-weight: bold; text-align: right; color: #000000 !important;">${t.total}:</td>
                        <td style="padding-top: 12px; font-size: 16px; font-weight: bold; text-align: right; color: #000000 !important;">€${total.toFixed(2)}</td>
                    </tr>
                </table>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/orders/${order.orderId}" 
                       style="display: inline-block; background-color: #C73228; color: #ffffff !important; text-decoration: none; padding: 12px 30px; font-size: 14px; font-weight: bold; border: 2px solid #C73228;">
                        ${t.trackButton}
                    </a>
                </div>

                <p style="margin: 20px 0 0; font-size: 13px; color: #666666 !important; text-align: center;">
                    ${t.footer}
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #ddd;">
                <p style="margin: 0 0 5px; font-size: 14px; font-weight: bold; color: #000000 !important;">
                    ${t.thanks}
                </p>
                <p style="margin: 0; font-size: 12px; color: #999999 !important;">
                    &copy; ${new Date().getFullYear()} Web-Fooder
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

/**
 * Send review email template
 * @param {Object} data - Template data
 * @returns {string} HTML email template
 */
export const sendReviewTemplate = (data) => {
    const { t } = data;
    
    return `
<!DOCTYPE html>
<html lang="${data.locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd;">
        
        <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #ffffff; border-bottom: 2px solid #000000;">
                <img src="${process.env.LOGO_URL || 'https://raw.githubusercontent.com/BlendiGR/Restaurant-App/refs/heads/stripe/client/src/assets/images/Fooder-Logo-Black.png'}" 
                     alt="Fooder Logo" 
                     style="max-width: 180px; height: auto; display: block; margin: 0 auto;" />
            </td>
        </tr>
        
        <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #C73228;">
                <h1 style="margin: 0; font-size: 24px; color: #ffffff !important;">${t.title}</h1>
            </td>
        </tr>

        <tr>
            <td style="padding: 50px 30px; background-color: #ffffff; text-align: center;">
                
                <p style="margin: 0 0 20px; font-size: 16px; color: #000000 !important;">
                    ${t.greeting}
                </p>
                <p style="margin: 0 0 40px; font-size: 14px; color: #666666 !important; line-height: 1.6;">
                    ${t.intro}
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/review" 
                       style="display: inline-block; background-color: #C73228; color: #ffffff !important; text-decoration: none; padding: 12px 30px; font-size: 14px; font-weight: bold; border: 2px solid #C73228;">
                        ${t.reviewButton}
                    </a>
                </div>

                <p style="margin: 30px 0 0; font-size: 13px; color: #666666 !important;">
                    ${t.footer}
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #ddd;">
                <p style="margin: 0 0 5px; font-size: 14px; font-weight: bold; color: #000000 !important;">
                    ${t.thanks}
                </p>
                <p style="margin: 0; font-size: 12px; color: #999999 !important;">
                    &copy; ${new Date().getFullYear()} Web-Fooder
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};