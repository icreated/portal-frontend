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
      // Slate — neutral professional dark (header→sidebar gradient: slate-600→800)
      {
        mainBackground: '#f1f5f9',
        headerColor: '#ffffff',
        headerBgColor: '#475569',
        headerBgColor2: '#1e293b',
        menubarBackground: '#334155',
        menubarColor: '#e2e8f0',   // 8.4:1 on menubar
        activeMenuColor: '#cbd5e1', // 6.8:1 on menubar
        primaryColor: '#2563eb',   // 5.2:1 with white text
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      // Airy — clean light with indigo accent (light sidebar)
      {
        mainBackground: '#f8fafc',
        headerColor: '#1e293b',    // 16.8:1 on white header
        headerBgColor: '#ffffff',
        headerBgColor2: '#e2e8f0',
        menubarBackground: '#f1f5f9',
        menubarColor: '#374151',   // 9.8:1 on light sidebar
        activeMenuColor: '#4f46e5', // 5.8:1 on light sidebar
        primaryColor: '#4f46e5',   // 5.8:1 with white text
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      // Ocean — teal (header→sidebar: teal-700→900)
      {
        mainBackground: '#f0fdfa',
        headerColor: '#ffffff',
        headerBgColor: '#0f766e',  // 5.5:1 with white
        headerBgColor2: '#134e4a',
        menubarBackground: '#134e4a',
        menubarColor: '#ccfbf1',   // 8.3:1 on teal-900
        activeMenuColor: '#5eead4', // 6.5:1 on teal-900
        primaryColor: '#0f766e',   // 5.5:1 with white text
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      // Royal — deep navy blue (blue-700→900)
      {
        mainBackground: '#eff6ff',
        headerColor: '#ffffff',
        headerBgColor: '#1d4ed8',  // 7.0:1 with white
        headerBgColor2: '#1e3a8a',
        menubarBackground: '#1e3a8a',
        menubarColor: '#bfdbfe',   // 7.3:1 on blue-900
        activeMenuColor: '#93c5fd', // 5.8:1 on blue-900
        primaryColor: '#2563eb',   // 5.2:1 with white text
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      // Berry — rich purple (purple-700→900)
      {
        mainBackground: '#fdf4ff',
        headerColor: '#ffffff',
        headerBgColor: '#7e22ce',  // 7.0:1 with white
        headerBgColor2: '#581c87',
        menubarBackground: '#581c87',
        menubarColor: '#f3e8ff',   // 10.9:1 on purple-900
        activeMenuColor: '#d8b4fe', // 6.7:1 on purple-900
        primaryColor: '#9333ea',   // 5.4:1 with white text
        primaryColorText: '#ffffff',
        fontFamily: 'Rubik'
      },
      // Forest — deep green (green-700→800)
      {
        mainBackground: '#f0fdf4',
        headerColor: '#ffffff',
        headerBgColor: '#15803d',  // 5.0:1 with white
        headerBgColor2: '#14532d',
        menubarBackground: '#14532d',
        menubarColor: '#dcfce7',   // 8.3:1 on green-800
        activeMenuColor: '#4ade80', // 5.3:1 on green-800
        primaryColor: '#15803d',   // 5.0:1 with white text
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
