import { SQSClient, SendMessageCommand, ReceiveMessageCommand, Message, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { ParsedEventData } from '../model/baseEventHandler';

export class Web3EventQueue {
    listenerQueueUrl: string;
    postingQueueUrl: string;
    sqs: SQSClient;
    constructor() {
        this.sqs = new SQSClient({
            region: process.env.AWS_REGION,
        });
        this.listenerQueueUrl = process.env.WEB3_EVENT_QUEUE!;
        this.postingQueueUrl = process.env.WEB3_NOTIFY_QUEUE!;
    }

    async postMessageToSQS(messageBody: any) {
        const comnmand = new SendMessageCommand({
            QueueUrl: this.postingQueueUrl,
            MessageBody: JSON.stringify(messageBody)
        });
        await this.sqs.send(comnmand);
    }

    private parseMessage(message: Message): ParsedEventData | undefined {
        try {
            return JSON.parse(message.Body || '{}');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Error handling message: ${error}`);
        }
    }

    // Define a function to poll messages from an SQS queue
    async pollQueue(messageHandler: (parsedEventData: ParsedEventData) => any): Promise<void> {
        try {
            // Poll messages from the queue
            const response = await this.sqs.send(new ReceiveMessageCommand({
                QueueUrl: this.listenerQueueUrl,
                MaxNumberOfMessages: 10, // Maximum number of messages to retrieve at once
                WaitTimeSeconds: 20, // Wait time for messages to become available (long polling)
            }));

            // Invoke the handleMessage function for each message received
            for (const message of response.Messages || []) {
                const messageBody = this.parseMessage(message);
                if (messageBody) {
                    await messageHandler(messageBody);
                    await this.sqs.send(new DeleteMessageCommand(
                        {
                            QueueUrl: this.listenerQueueUrl,
                            ReceiptHandle: message.ReceiptHandle,
                        }
                    ))
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Error polling queue: ${error}`);
        }
    }
}
