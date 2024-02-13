const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

class SNSPublisher {
    constructor() {
        if (!SNSPublisher.instance) {
            SNSPublisher.instance = new SNSClient({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });
        }
    }

    getClient() {
        return SNSPublisher.instance;
    }

    async publishMessage(params) {
        try {
            const command = new PublishCommand(params);
            const response = await SNSPublisher.instance.send(command);
            console.log("Message published:", response);
            return response;
        } catch (error) {
            console.error("Error publishing message:", error);
            throw error;
        }
    }
}

const snsPublisher = new SNSPublisher();
module.exports = { snsPublisher };