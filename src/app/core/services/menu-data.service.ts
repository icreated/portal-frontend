import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    getMenuList(): CustomMenuItem[] {
        return [
            {
                Label: 'home', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'invoices', Icon: 'fa-handshake', RouterLink: '/main/invoices', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'payments', Icon: 'fa-credit-card', RouterLink: '/main/payments', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'settings', Icon: 'fa-cogs', RouterLink: '/main/settings', Childs: null as any, IsChildVisible: false
            }
        ];
    }
}
