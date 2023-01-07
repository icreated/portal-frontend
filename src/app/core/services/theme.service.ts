import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CustomMenuItem} from "../models/menu-item.model";
import {DesignTemplate} from "../models/design-template.model";

@Injectable({
  providedIn: 'root',
})
/**
 * Theme provider service
 */
export class ThemeService {

  private theme: BehaviorSubject<DesignTemplate> = new BehaviorSubject<DesignTemplate>(this.getThemes()[0]);


  getThemes(): DesignTemplate[] {
    return [
      {
        mainBackground: '#f5f5f5',
        headerColor: '#ffffff',
        headerBgColor: '#6f6f88',
        headerBgColor2: '#3b3b48',
        menubarBackground: '#525262',
        menubarColor: '#f5f5f5',
        activeMenuColor: '#919191',
        primaryColor: '#0078d4',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      {
        mainBackground: '#ffffff',
        headerColor: '#000000',
        headerBgColor: '#ffffff',
        headerBgColor2: '#878787',
        menubarBackground: '#878787',
        menubarColor: '#000000',
        activeMenuColor: '#cccccc',
        primaryColor: '#0078d4',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      {
        mainBackground: '#f4f3ef',
        headerColor: '#ffffff',
        headerBgColor: '#6cc7cf',
        headerBgColor2: '#66615b',
        menubarBackground: '#66615b',
        menubarColor: '#f5f5f5',
        activeMenuColor: '#51cbce',
        primaryColor: '#0078d4',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      {
        mainBackground: '#f5f5f5',
        headerColor: '#ffffff',
        headerBgColor: '#2d5394',
        headerBgColor2: '#2d5394',
        menubarBackground: '#839de2',
        menubarColor: '#f5f5f5',
        activeMenuColor: '#2d5394',
        primaryColor: '#0078d4',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      {
        mainBackground: '#f5f5f5',
        headerColor: '#ffffff',
        headerBgColor: '#79425a',
        headerBgColor2: '#79425a',
        menubarBackground: '#935b74',
        menubarColor: '#f5f5f5',
        activeMenuColor: '#440c25',
        primaryColor: '#0078d4',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      {
        mainBackground: '#f5f5f5',
        headerColor: '#ffffff',
        headerBgColor: '#277375',
        headerBgColor2: '#277375',
        menubarBackground: '#f5f5f5',
        menubarColor: '#277375',
        activeMenuColor: '#277375',
        primaryColor: '#277375',
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      }
    ];
  }


  getFonts(): string[] {
    return ['Rubik', 'Roboto', 'Balsamiq', 'OpenDyslexic'];
  }

  /**
   *
   * @param value on selecting theme set theme variable globally
   */
  selectTheme(template: DesignTemplate) {
    let style = document.documentElement.style;
    style.setProperty(`--main-background`, template.mainBackground);
    style.setProperty(`--header-footer-color`, template.headerColor);
    style.setProperty(`--header-footer-bg-color`, template.headerBgColor);
    style.setProperty(`--header-footer-bg-color2`, template.headerBgColor2);
    style.setProperty(`--menubar-color`, template.menubarColor);
    style.setProperty(`--menubar-background`, template.menubarBackground);
    style.setProperty(`--active-menu-color`, template.activeMenuColor);

    style.setProperty(`--primary-color`, template.primaryColor);
    style.setProperty(`--primary-color-text`, template.primaryColorText);
    style.setProperty(`--font-family`, template.fontFamily);
  }

  getTheme(): Observable<DesignTemplate> {
    return this.theme.asObservable();
  }

}


export interface Font {
  name: string,
  code: string
}
