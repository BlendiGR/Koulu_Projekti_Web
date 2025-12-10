import nodemailer from "nodemailer";
import { orderConfirmationTemplate, sendReviewTemplate } from "../templates/email-templates.js";

/**
 * Create nodemailer transporter
 * Configure with your email service credentials in .env
 */
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

/**
 * Send an email
 * @param {Object} emailData - Email data
 * @param {string} emailData.to - Recipient email
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.html - HTML content
 * @returns {Promise<*>}
 */
export const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Restaurant App'}" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    return await transporter.sendMail(mailOptions);
};

/**
 * Get order confirmation email content based on locale
 * @param {Object} order - Order object with products
 * @param {string} locale - Language locale ('en' or 'fi')
 * @returns {Object} - { subject, html }
 */
export const getOrderConfirmationEmail = (order, locale = 'en') => {
    const translations = {
        en: {
            subject: `Order Confirmation #${order.orderId}`,
            title: 'Thank You for Your Order!',
            greeting: `Hi ${order.user?.username || 'Customer'},`,
            intro: 'We have received your order and it is being prepared.',
            orderNumber: 'Order Number',
            orderDate: 'Order Date',
            deliveryAddress: 'Delivery Address',
            orderDetails: 'Order Details',
            product: 'Product',
            quantity: 'Qty',
            price: 'Price',
            subtotal: 'Subtotal',
            discount: 'Discount',
            total: 'Total',
            trackButton: 'Track Order',
            footer: 'If you have any questions, please contact us.',
            thanks: 'Thank you for choosing us!',
        },
        fi: {
            subject: `Tilausvahvistus #${order.orderId}`,
            title: 'Kiitos tilauksestasi!',
            greeting: `Hei ${order.user?.username || 'asiakas'},`,
            intro: 'Olemme vastaanottaneet tilauksesi ja se on valmisteilla.',
            orderNumber: 'Tilausnumero',
            orderDate: 'Tilauspäivä',
            deliveryAddress: 'Toimitusosoite',
            orderDetails: 'Tilauksen tiedot',
            product: 'Tuote',
            quantity: 'Määrä',
            price: 'Hinta',
            subtotal: 'Välisumma',
            discount: 'Alennus',
            total: 'Yhteensä',
            trackButton: 'Seuraa tilausta',
            footer: 'Jos sinulla on kysyttävää, ota meihin yhteyttä.',
            thanks: 'Kiitos, että valitsit meidät!',
        }
    };

    const t = translations[locale] || translations.en;

    // Calculate totals
    const subtotal = order.orderProducts?.reduce((sum, item) => 
        sum + (Number(item.product.cost) || 0) * item.quantity, 0) || Number(order.cost) || 0;
    
    const discount = order.discount || 0;
    const total = Number(order.cost) || (subtotal - discount);

    // Format date
    const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString(
        locale === 'fi' ? 'fi-FI' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    // Build products table
    const productsHTML = order.orderProducts?.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #000000 !important;">${item.product.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center; color: #000000 !important;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; color: #000000 !important;">€${(Number(item.product.cost) || 0).toFixed(2)}</td>
        </tr>
    `).join('') || '';

    // Generate HTML using template
    const html = orderConfirmationTemplate({
        locale,
        t,
        order,
        orderDate,
        productsHTML,
        subtotal,
        discount,
        total
    });

    return { subject: t.subject, html };
};

/**
 * Get review request email content based on locale
 * @param {string} locale - Language locale ('en' or 'fi')
 * @returns {Object} - { subject, html }
 */
export const getReviewEmail = (locale = 'en') => {
    const translations = {
        en: {
            subject: 'How was your experience?',
            title: 'We\'d Love Your Feedback!',
            greeting: 'Thank you for choosing us!',
            intro: 'We hope you enjoyed your order. Your feedback helps us improve and serve you better. Please take a moment to share your experience with us.',
            reviewButton: 'Leave a Review',
            footer: 'Your opinion matters to us!',
            thanks: 'Thank you for your time!',
        },
        fi: {
            subject: 'Mikä oli kokemuksesi?',
            title: 'Haluaisimme palautteesi!',
            greeting: 'Kiitos, että valitsit meidät!',
            intro: 'Toivomme, että nautit tilauksestasi. Palautteesi auttaa meitä parantamaan palveluamme. Käytä hetki ja jaa kokemuksesi kanssamme.',
            reviewButton: 'Jätä arvostelu',
            footer: 'Mielipiteesi on meille tärkeä!',
            thanks: 'Kiitos ajastasi!',
        }
    };

    const t = translations[locale] || translations.en;

    const html = sendReviewTemplate({
        locale,
        t
    });

    return { subject: t.subject, html };
};
