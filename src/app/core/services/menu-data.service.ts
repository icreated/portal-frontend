import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CustomMenuItem} from '../models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

  public toggleMenuBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public dockMenuBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /**
   * Application Menu list
   */
  getMenuList(): CustomMenuItem[] {
      return [
          {
              label: 'home', icon: 'fa-home', routerLink: '/main/dashboard', childs: null as any, isChildVisible: false
          },
          {
              label: 'invoices',
              icon: 'fa-handshake',
              routerLink: '/main/invoices',
              childs: null as any,
              isChildVisible: false
          },
          {
              label: 'payments',
              icon: 'fa-credit-card',
              routerLink: '/main/payments',
              childs: null as any,
              isChildVisible: false
          },
          {
              label: 'settings', icon: 'fa-cogs', routerLink: '/main/settings', childs: null as any, isChildVisible: false
          }
      ];
  }
}
