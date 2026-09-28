const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "Healthcare Notification Service",
        status: "Running"
    });
});

// Send notification
app.post("/api/notifications", (req, res) => {

    const { patientId, type, message } = req.body;

    if (!patientId || !type || !message) {
        return res.status(400).json({
            success: false,
            message: "patientId, type and message are required"
        });
    }

    console.log("Notification received:");
    console.log({
        patientId,
        type,
        message
    });

    return res.status(200).json({
        success: true,
        message: "Notification processed successfully",
        data: {
            patientId,
            type,
            message
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Healthcare Notification Service running on port ${PORT}`
    );
});