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
                Label: 'Home', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'Invoices', Icon: 'fa-handshake', RouterLink: '/main/invoices', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'Payments', Icon: 'fa-credit-card', RouterLink: '/main/payments', Childs: null as any, IsChildVisible: false
            },
            {
                Label: 'Settings', Icon: 'fa-cogs', RouterLink: '/main/settings', Childs: null as any, IsChildVisible: false
            }
        ];
    }
}
