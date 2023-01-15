import {Injectable} from '@angular/core';
import {Message, MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Toast service class
 * This class provides methods to add single, multiple alerts as a toast
 */
export class ToastService {

    constructor(private messageService: MessageService, private translationService: TranslateService) {
    }

    /**
     * add single toast message
     *
     * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
     * @param summary Summary text of the message.
     * @param detail Detail text of the message.
     * @param isI18nKey Optional translation key
     */
    addSingle(severity: string, summary: string, detail: string, isI18nKey?: boolean) {
        if (isI18nKey) {
            this.translationService.get(detail).subscribe(msg =>
                this.messageService.add({severity, summary, detail: msg})
            );
        } else {
            this.messageService.add({severity, summary, detail});
        }
    }

    /**
     * add multiple toast messages
     *
     * @param messages
     * array of message type {severity:'success', summary:'Service Message', detail:'Via MessageService'}
     */
    addMultiple(messages: Message[]) {
        this.messageService.addAll(messages);
    }

    /**
     * clear all toast messages
     */
    clear() {
        this.messageService.clear();
    }

  public handleCommonErrorMessages(error: any): void {

    switch (error) {
      case 'Bad Request': this.addSingle('warn', '', 'format-wrong-msg', true);
        break;
      case 'Not Found': this.addSingle('warn', '', 'data-not-found', true);
        break;
      case 'Server Error': this.addSingle('error', '', 'server-error', true);
        break;
    }
  }
}
