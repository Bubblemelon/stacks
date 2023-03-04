import { BaseEventHandler, ContractDetail, EventNameWithHandler, ParsedEventData, NotificationDetail } from "../model/baseEventHandler"
import { CHAIN } from "../shared/chains.enum";

export class DepositEventHander extends BaseEventHandler {
    getContractDetails(): ContractDetail[] {
        return [
            {
                chain: CHAIN.POLYGON,
                address: '0xcf6030BDEaB4E503D186426510aD88C1DA7125A3', // example deployed contract address
            }
        ]
    }
    getEventsToRegister(): EventNameWithHandler[] {
        return [
            {
                eventName: 'DepositHandlerEvent',
                eventHandler: this.eventProcessor,
            }
        ]
    }
    eventProcessor = (parsedEventData: ParsedEventData): NotificationDetail[] => {
        // Can be returning multiple notification message. Or same message to multiple addresses
        return [
            {
                address: '0x1', // Wallet address to be notified
                title: 'Purchase Successful!', // Short title of the event
                message: `Your Stack order is made`,
                options: { // Use case specific options which would need updates on the consumer side of notification to handle

                }
            }
        ]
    }
}