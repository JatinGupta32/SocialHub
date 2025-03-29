module.exports = passwordUpdated = (email, message) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">Password Updated Successfully</h2>
            <p>Hello <strong>${message.split('for ')[1]}</strong>,</p>
            <p>Your password has been updated successfully.</p>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p style="text-align: center; margin-top: 20px;">
                <a href="https://yourwebsite.com/login" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">If you have any questions, reach out to us at support@yourwebsite.com</p>
        </div>
    `;
}
