import {inject, Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

export interface ConfirmOptions {
    /** i18n key for the body message */
    messageKey: string;
    /** i18n key for the dialog header (default: 'confirm-title') */
    headerKey?: string;
    /** Callback called when the user clicks Accept */
    onAccept: () => void;
    /** Optional callback called when the user clicks Reject */
    onReject?: () => void;
}

/**
 * ConfirmService — thin wrapper around PrimeNG ConfirmationService.
 *
 * Usage:
 *   this.confirmService.delete(() => this.deleteItem(id));
 *   this.confirmService.confirm({ messageKey: 'my-key', onAccept: () => ... });
 */
@Injectable({ providedIn: 'root' })
export class ConfirmService {

    private confirmationService = inject(ConfirmationService);
    private translateService = inject(TranslateService);

    /** Generic confirm dialog */
    confirm(options: ConfirmOptions): void {
        const keys = [
            options.messageKey,
            options.headerKey ?? 'confirm-title',
            'confirm-yes',
            'confirm-no'
        ];
        this.translateService.get(keys).subscribe(t => {
            this.confirmationService.confirm({
                message: t[options.messageKey],
                header: t[options.headerKey ?? 'confirm-title'],
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: t['confirm-yes'],
                rejectLabel: t['confirm-no'],
                acceptButtonStyleClass: 'p-button-danger',
                rejectButtonStyleClass: 'p-button-text',
                accept: options.onAccept,
                reject: options.onReject
            });
        });
    }

    /** Shorthand for delete confirmation */
    delete(onAccept: () => void): void {
        this.confirm({ messageKey: 'confirm-delete', onAccept });
    }
}
