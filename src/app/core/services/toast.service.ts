import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root',
})
/**
 * Toast service class
 * This class provides methods to add single, multiple alerts as a toast
 */
export class ToastService {
    constructor(private messageService: MessageService, private translationService: TranslateService) { }

    /**
     * add single toast message
     * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
     * @param summary Summary text of the message.
     * @param detail Detail text of the message.
     */
    addSingle(severity: string, summary: string, detail: string, isI18nKey?: boolean) {
        if (isI18nKey) {
          this.translationService.get(detail).subscribe( msg =>
            this.messageService.add({ severity: severity, summary: summary, detail: msg })
          );
        } else {
          this.messageService.add({ severity: severity, summary: summary, detail: detail });
        }

    }

    /**
     * add multiple toast messages
     * @param messages
     * array of message type {severity:'success', summary:'Service Message', detail:'Via MessageService'}
     */
    addMultiple(messages: any) {
        this.messageService.addAll(messages);
    }

    /**
     * clear all toast messages
     */
    clear() {
        this.messageService.clear();
    }
}
