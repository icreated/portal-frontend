import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CustomMenuItem} from '../models/menu-item.model';

export interface MenuState {
    isMenuOpened: boolean;
    isMenuDocked: boolean;
}

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {


  public toggleMenuBar: BehaviorSubject<MenuState> = new BehaviorSubject<MenuState>({isMenuOpened: false, isMenuDocked: true});

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
