import { transporter } from '../config/mail';
import dotenv from 'dotenv';

dotenv.config();

// Send new inquiry notification to admin
export const sendNewInquiryAlert = async (inquiryData: {
  title: string;
  email: string;
  subject: string;
  message?: string;
  relatedPropertyId?: number | null;
  relatedProperty?: {
    id: number;
    title: string;
    location: string;
    price?: string;
  } | null;
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER;

    if (!adminEmail) {
      throw new Error('Admin email not configured');
    }

    // Create HTML email content
    const emailContent = {
      from: `"${process.env.MAIL_FROM_NAME || 'Winconstructures'}" <${process.env.MAIL_USER}>`,
      to: adminEmail,
      subject: `New Inquiry: ${inquiryData.subject}`,
      html: generateNewInquiryTemplate(inquiryData),
      text: generateNewInquiryText(inquiryData),
    };

    // Send email
    const info = await transporter.sendMail(emailContent);
    console.log('New inquiry alert sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send inquiry alert:', error);
    return { success: false, error: (error as Error).message };
  }
};

// HTML email template for new inquiries
const generateNewInquiryTemplate = (data: {
  title: string;
  email: string;
  subject: string;
  message?: string;
  relatedPropertyId?: number | null;
  relatedProperty?: {
    id: number;
    title: string;
    location: string;
    price?: string;
  } | null;
}) => {
  const propertyInfo = data.relatedProperty
    ? `
    <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <h4 style="margin: 0 0 10px 0; color: #007bff;">Related Property</h4>
      <p style="margin: 5px 0;"><strong>Property:</strong> ${data.relatedProperty.title}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> ${data.relatedProperty.location}</p>
      ${data.relatedProperty.price ? `<p style="margin: 5px 0;"><strong>Price:</strong> ${data.relatedProperty.price}</p>` : ''}
      <p style="margin: 5px 0;"><strong>Property ID:</strong> ${data.relatedProperty.id}</p>
    </div>
  `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid #007bff;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #007bff;
          margin: 0;
          font-size: 24px;
        }
        .alert-icon {
          font-size: 48px;
          text-align: center;
          margin: 20px 0;
        }
        .field {
          margin: 15px 0;
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        .field-label {
          font-weight: bold;
          color: #555;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 16px;
          color: #333;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: bold;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          font-size: 12px;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry Received</h1>
        </div>

        <div class="alert-icon">[New Message]</div>

        <p style="text-align: center; font-size: 18px; color: #666;">
          You have received a new inquiry from <strong>${data.title}</strong>
        </p>

        <div style="margin: 30px 0;">
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${data.title}</div>
          </div>

          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">
              <a href="mailto:${data.email}" style="color: #007bff;">${data.email}</a>
            </div>
          </div>

          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${data.subject}</div>
          </div>

          ${data.message ? `
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value" style="white-space: pre-wrap;">${data.message}</div>
          </div>
          ` : ''}
        </div>

        ${propertyInfo}

        <div style="text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" class="button">
            Reply to Inquiry
          </a>
        </div>

        <div class="footer">
          <p>This is an automated notification from Winconstructures.</p>
          <p>Please log in to your admin panel to manage this inquiry.</p>
          <p style="margin-top: 10px;">Received: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Plain text version for email clients that don't support HTML
const generateNewInquiryText = (data: {
  title: string;
  email: string;
  subject: string;
  message?: string;
  relatedPropertyId?: number | null;
  relatedProperty?: {
    id: number;
    title: string;
    location: string;
    price?: string;
  } | null;
}) => {
  let text = `
NEW INQUIRY RECEIVED
====================

From: ${data.title}
Email: ${data.email}
Subject: ${data.subject}
`;

  if (data.message) {
    text += `
Message:
${data.message}
`;
  }

  if (data.relatedProperty) {
    text += `
RELATED PROPERTY
================
Property: ${data.relatedProperty.title}
Location: ${data.relatedProperty.location}
${data.relatedProperty.price ? `Price: ${data.relatedProperty.price}\n` : ''}Property ID: ${data.relatedProperty.id}
`;
  }

  text += `
--------------------
To reply, email: ${data.email}
Received: ${new Date().toLocaleString()}
`;

  return text;
};

// Send login alert
export const sendLoginAlert = async (loginData: {
  email: string;
  timestamp: Date;
  successful: boolean;
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER;

    if (!adminEmail) {
      throw new Error('Admin email not configured');
    }

    const status = loginData.successful ? 'SUCCESSFUL' : 'FAILED';
    const statusColor = loginData.successful ? '#28a745' : '#dc3545';

    const emailContent = {
      from: `"${process.env.MAIL_FROM_NAME || 'Winconstructures'}" <${process.env.MAIL_USER}>`,
      to: adminEmail,
      subject: `${status} Login Attempt`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid ${statusColor}; margin-bottom: 20px; }
            .alert { background-color: ${loginData.successful ? '#d4edda' : '#f8d7da'}; border-left: 4px solid ${statusColor}; padding: 15px; margin: 20px 0; }
            .field { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; }
            .field-label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; }
            .field-value { font-size: 16px; color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: ${statusColor}; margin: 0;">${status} LOGIN ATTEMPT</h1>
            </div>
            <div class="alert">
              <p style="margin: 0; font-weight: bold;">A login attempt was made to your admin account.</p>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${loginData.email}</div>
            </div>
            <div class="field">
              <div class="field-label">Time</div>
              <div class="field-value">${loginData.timestamp.toLocaleString()}</div>
            </div>
            <div class="field">
              <div class="field-label">Status</div>
              <div class="field-value">${status}</div>
            </div>
            ${!loginData.successful ? '<p style="color: #dc3545; font-weight: bold; margin-top: 20px;">WARNING: If this wasn\'t you, please secure your account immediately.</p>' : ''}
          </div>
        </body>
        </html>
      `,
      text: `
${status} LOGIN ATTEMPT
=====================

Email: ${loginData.email}
Time: ${loginData.timestamp.toLocaleString()}
Status: ${status}

${!loginData.successful ? 'WARNING: If this wasn\'t you, please secure your account immediately.' : ''}
      `,
    };

    const info = await transporter.sendMail(emailContent);
    console.log('Login alert sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send login alert:', error);
    return { success: false, error: (error as Error).message };
  }
};