import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ColorPickerModule} from 'primeng/colorpicker';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {SelectModule} from 'primeng/select';
import {TranslateModule} from '@ngx-translate/core';
import {SessionService} from '../../../core/services/session.service';
import {ThemeService} from '../../../core/services/theme.service';
import {DesignTemplate} from "../../../core/models/design-template.model";

@Component({
    selector: 'app-theme-chooser',
    templateUrl: './theme-chooser.component.html',
    styleUrls: ['./theme-chooser.component.css'],
    standalone: true,
    imports: [FormsModule, TranslateModule, PanelModule, FieldsetModule, ColorPickerModule, SelectModule, ButtonModule],
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
