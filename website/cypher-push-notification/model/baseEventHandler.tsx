import { CHAIN } from "../shared/chains.enum";
import { EventEmitter } from "node:events";

export abstract class BaseEventHandler {
  abstract getContractDetails(): ContractDetail[];
  abstract getEventsToRegister(): EventNameWithHandler[];

  registerOnEvents(eventEmitter: EventEmitter): void {
    this.getContractDetails().forEach((contractDetail) => {
      this.getEventsToRegister().forEach((eventNameWithHandler) => {
        // eslint-disable-next-line no-console
        console.log(
          `Event handler registered for ${this.getEventKey(
            contractDetail,
            eventNameWithHandler.eventName
          )},`
        );
        eventEmitter.on(
          this.getEventKey(contractDetail, eventNameWithHandler.eventName),
          (parsedEventData: ParsedEventData) => {
            this.sendNotificationData(
              eventNameWithHandler.eventHandler(parsedEventData)
            );
          }
        );
      });
    });
  }
  private sendNotificationData(notificationDetails: NotificationDetail[]) {
    // eslint-disable-next-line no-console
    console.log(notificationDetails);
    // Publish to SNS here.
  }
  private getEventKey(
    contractDetail: ContractDetail,
    eventName: string
  ): string {
    // eslint-disable-next-line no-console
    return `${contractDetail.chain}:${contractDetail.address}:${eventName}`;
  }
}

export interface ContractDetail {
  address: string;
  chain: CHAIN;
}

export interface EventNameWithHandler {
  eventName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventHandler: (parsedEventData: ParsedEventData) => NotificationDetail[];
}

export interface NotificationDetail {
  address: string | string[];
  title: string; // Short title of the event
  message: string; // Message to be shown on the notification
  options: {
    // Use case specific options which would need updates on the consumer side of notification to handle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export interface ParsedEventData {
  chain: CHAIN;
  contractAddress: string;
  eventName: string;
  txnHash?: string;
  eventData: any;
}
