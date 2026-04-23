import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {SessionService} from '../../../core/services/session.service';
import {ThemeService} from '../../../core/services/theme.service';
import {DesignTemplate} from "../../../core/models/design-template.model";

@Component({
    selector: 'app-theme-chooser',
    templateUrl: './theme-chooser.component.html',
    styleUrls: ['./theme-chooser.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeChooserComponent implements OnInit {

  private sessionService = inject(SessionService);
  private themeService = inject(ThemeService);

  themes!: DesignTemplate[];
  theme!: DesignTemplate;
  fonts!: string[];

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();
    this.theme = this.sessionService.getItem('selected-theme');
    if (!this.theme) {
      this.theme = this.themeService.getThemes()[0];
    }
    this.themeService.selectTheme(this.theme);
    this.fonts = this.themeService.getFonts();
  }

  selectTheme(theme: DesignTemplate) {
    this.theme = theme;
    this.sessionService.setItem('selected-theme', theme);
    this.themeService.selectTheme(theme);
  }

  updateTheme() {
    this.sessionService.setItem('selected-theme', this.theme);
    this.themeService.selectTheme(this.theme);
  }

}
