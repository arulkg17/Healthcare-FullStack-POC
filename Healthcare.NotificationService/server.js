const express = require("express");
const nodemailer = require("nodemailer");
const SmsService = require("./services/smsService");

const app = express();
const PORT = 3000;

app.use(express.json());

const smsService = new SmsService();

const emailTransporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false
});

app.get("/health", (req, res) => {
    res.json({
        service: "Healthcare Notification Service",
        status: "Running"
    });
});

app.post("/api/notifications/test-email", async (req, res) => {

    try {

        const info = await emailTransporter.sendMail({
            from: "healthcare@localhost",
            to: "test@example.com",
            subject: "Healthcare Notification Test",
            text: "This is a test email from the Healthcare Notification Service.",
            html: `
                <h2>Healthcare Notification Test</h2>
                <p>This email was sent from the Node.js Notification Service.</p>
                <p>Mailpit received it successfully.</p>
            `
        });

        console.log("Email sent:");
        console.log(info.messageId);

        return res.status(200).json({
            success: true,
            message: "Test email sent successfully.",
            messageId: info.messageId
        });

    } catch (error) {

        console.error("Email sending failed:", error);

        return res.status(500).json({
            success: false,
            message: "Email sending failed."
        });
    }
});

app.post("/api/notifications", async (req, res) => {

    const {
        patientId,
        type,
        message
    } = req.body;

    if (!patientId || !type || !message) {

        return res.status(400).json({
            success: false,
            message: "patientId, type and message are required"
        });
    }

    try {

        console.log("Notification received:");

        console.log({
            patientId,
            type,
            message
        });

        if (type.toLowerCase() === "email") {

            const info = await emailTransporter.sendMail({

                from: "healthcare@localhost",

                to: "test@example.com",

                subject:
                    `Healthcare Notification - Patient ${patientId}`,

                text: message,

                html: `
                    <h2>Healthcare Notification</h2>

                    <p>
                        <strong>Patient ID:</strong>
                        ${patientId}
                    </p>

                    <p>
                        <strong>Message:</strong>
                        ${message}
                    </p>
                `
            });

            console.log("Email sent:");
            console.log(info.messageId);

            return res.status(200).json({
                success: true,
                message: "Email notification sent successfully.",
                notificationType: "Email",
                messageId: info.messageId
            });
        }

        if (type.toLowerCase() === "sms") {

            const phoneNumber = "5551234567";

            const result = await smsService.sendSms(
                phoneNumber,
                message
            );

            console.log("SMS sent successfully:");

            console.log(result);

            return res.status(200).json({
                success: true,
                message: "SMS notification sent successfully.",
                notificationType: "SMS",
                messageId: result.messageId
            });
        }

        return res.status(400).json({
            success: false,
            message: `Unsupported notification type: ${type}`
        });

    } catch (error) {

        console.error(
            "Notification processing failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Notification processing failed."
        });
    }
});

app.listen(PORT, () => {

    console.log(
        `Healthcare Notification Service running on port ${PORT}`
    );

});
