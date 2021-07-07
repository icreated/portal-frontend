import {TestBed} from '@angular/core/testing';

import {ToastService} from './toast.service';
import {Message, MessageService} from 'primeng/api';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';

describe('ToastService', () => {
    let toastService: ToastService;
    let messageServiceSpy: SpyObj<MessageService>;
    let translateService: TranslateService;

    beforeEach(() => {
        const messageSpy = createSpyObj('MessageService', ['add', 'addAll', 'clear']);

        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [
                {provide: MessageService, useValue: messageSpy}
            ]
        });
        toastService = TestBed.inject(ToastService);
        translateService = TestBed.inject(TranslateService);
        spyOn(translateService, 'get').and.returnValue(of('Bonjour le monde'));
        messageServiceSpy = TestBed.inject(MessageService) as SpyObj<MessageService>;
    });

    it('should be created', () => {
        expect(toastService).toBeTruthy();
    });

    describe('addSingle', () => {
        it('should check that translation not called when isI18nKey is false', () => {
            const msgInfo = {
                severity: 'info', summary: 'welcomeMessage', detail: 'Welcome to Portal Idempiere',
                isI18nKey: false
            };
            toastService.addSingle(msgInfo.severity, msgInfo.summary, msgInfo.detail);
            expect(translateService.get).toHaveBeenCalledTimes(0);
            expect(messageServiceSpy.add.calls.count()).toBe(1);
        });

        it('should check that translation is called when isI18nKey is true', () => {
            const msgInfo = {
                severity: 'info', summary: 'welcomeMessage', detail: 'Welcome to Portal Idempiere',
                isI18nKey: true
            };
            toastService.addSingle(msgInfo.severity, msgInfo.summary, msgInfo.detail, true);
            expect(translateService.get).toHaveBeenCalledTimes(1);
            expect(messageServiceSpy.add.calls.count()).toBe(1);
        });
    });

    it('should check that messageService.addMultiple is called', () => {
        const messages = [];
        messages.push({severity: 'info', summary: 'welcomeMessage', detail: 'Welcome to Portal Idempiere'} as Message);
        messages.push({severity: 'error', summary: 'error', detail: 'Strange error is here'} as Message);

        toastService.addMultiple(messages);
        expect(messageServiceSpy.addAll).toHaveBeenCalled();
        expect(messageServiceSpy.addAll.calls.count()).toBe(1);
    });

    it('should check that messageService.clear is called', () => {
        toastService.clear();
        expect(messageServiceSpy.clear).toHaveBeenCalled();
        expect(messageServiceSpy.clear.calls.count()).toBe(1);
    });
});
