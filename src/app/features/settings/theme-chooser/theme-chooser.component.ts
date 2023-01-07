import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../core/services/session.service';
import {ThemeService} from '../../../core/services/theme.service';
import {DesignTemplate} from "../../../core/models/design-template.model";

@Component({
  selector: 'app-theme-chooser',
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.css']
})
export class ThemeChooserComponent implements OnInit {

  themes!: DesignTemplate[];
  theme!: DesignTemplate;

  fonts!: string[];

  constructor(private sessionService: SessionService, private themeService: ThemeService) {
  }

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
