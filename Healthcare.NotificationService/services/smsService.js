class SmsService {

    async sendSms(phoneNumber, message) {

        console.log("SMS notification:");

        console.log({
            phoneNumber,
            message
        });

        // Mock SMS provider for local development
        return {
            success: true,
            provider: "MockSmsProvider",
            messageId: `SMS-${Date.now()}`
        };
    }
}

module.exports = SmsService;