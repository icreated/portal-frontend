import {TestBed} from '@angular/core/testing';

import {SessionService} from './session.service';

describe('SessionService', () => {
    let service: SessionService;

    let store = {} as any;
    const dummy = {author: 'Orwell', title: '1984', year: 1949};

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SessionService);
        store = {} as any;
        spyOn(sessionStorage, 'getItem').and.callFake((key) => store[`${key}`]);
        spyOn(sessionStorage, 'setItem').and.callFake((key, value) => store[`${key}`] = value + '');
        spyOn(sessionStorage, 'removeItem').and.callFake((key) => {
            delete store[`${key}`];
        });
        spyOn(sessionStorage, 'clear').and.callFake(() => {
            store = {};
        });

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should put & get the same object', () => {
        service.setItem('book', dummy);
        expect(service.getItem('book')).toEqual(dummy);
    });

    it('should put & remove the object, the result is null', () => {
        service.setItem('book', dummy);
        service.removeItem('book');
        expect(service.getItem('book')).toBeNull();
    });

    it('should clear the session', () => {
        service.setItem('book1', dummy);
        service.setItem('book2', dummy);
        service.clear();
        expect(service.getItem('book1')).toBeNull();
        expect(service.getItem('book2')).toBeNull();
    });

});
