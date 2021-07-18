import { TestBed } from '@angular/core/testing';

import { RouteStateService } from './route-state.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {RouteState} from '../models/route-state.model';

describe('RouteStateService', () => {
    let service: RouteStateService;
    let router: Router;
    let store = {} as any;
    let navigateSpy: jasmine.Func;
    const dummy1 = {id: 1, title: 'invoice-detail', path: '/main/invoice-detail', data: 111, isParent: false} as RouteState;
    const dummy2 = {id: 2, title: 'invoice', path: '/main/invoice', data: 222, isParent: false} as RouteState;
    const dummy3 = {id: 3, title: 'payment', path: '/main/payment', data: 333, isParent: false} as RouteState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])]
        });
        service = TestBed.inject(RouteStateService);
        router = TestBed.inject(Router);
        navigateSpy = spyOn(router, 'navigate');

        store = {} as any;
        spyOn(localStorage, 'getItem').and.callFake((key) => store[`${key}`]);
        spyOn(localStorage, 'setItem').and.callFake((key, value) => store[`${key}`] = value + '');
        spyOn(localStorage, 'removeItem').and.callFake((key) => {
            delete store[`${key}`];
        });

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('add', () => {
        it('should add routers and check if it contains them', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            expect(navigateSpy).toHaveBeenCalledWith([dummy1.path]);
            service.add(dummy2.title, dummy2.path, dummy2.data, dummy2.isParent);
            expect(navigateSpy).toHaveBeenCalledWith([dummy2.path]);
            expect(service.getAll().length).toBe(2);
        });

        it('should check whether parent Router remove all precedents', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            service.add(dummy2.title, dummy2.path, dummy2.data, true);
            service.add(dummy3.title, dummy3.path, dummy3.data, dummy3.isParent);
            expect(service.getAll().length).toBe(2);
        });
    });

    describe('getCurrent', () => {
        it('should check whether the last Router is the current', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            service.add(dummy2.title, dummy2.path, dummy2.data, dummy2.isParent);
            service.add(dummy3.title, dummy3.path, dummy3.data, true);
            const current = service.getCurrent();
            // id is generated in constructor, so we redefine it for tests
            current.id = dummy2.id;
            expect(current).toEqual(dummy2);
        });
    });

    describe('loadPrevious', () => {
        it('should check whether the previous Router is navigated', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            service.add(dummy2.title, dummy2.path, dummy2.data, dummy2.isParent);
            service.add(dummy3.title, dummy3.path, dummy3.data, dummy3.isParent);
            service.loadPrevious();
            expect(navigateSpy).toHaveBeenCalledWith([dummy2.path]);
        });
    });

    describe('loadById', () => {
        it('should check whether the Router navigate by Id', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            service.add(dummy2.title, dummy2.path, dummy2.data, dummy2.isParent);
            service.add(dummy3.title, dummy3.path, dummy3.data, dummy3.isParent);
            service.loadById(dummy2.id);
            expect(navigateSpy).toHaveBeenCalledWith([dummy2.path]);
        });
    });

    describe('removeAll', () => {
        it('should remove all added Routers', () => {
            service.add(dummy1.title, dummy1.path, dummy1.data, dummy1.isParent);
            service.add(dummy2.title, dummy2.path, dummy2.data, dummy2.isParent);
            service.add(dummy3.title, dummy3.path, dummy3.data, dummy3.isParent);
            service.removeAll();
            expect(service.getAll().length).toBe(0);
        });
    });

});
