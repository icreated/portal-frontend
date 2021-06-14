import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../core/services/session.service';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-chooser',
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.css']
})
export class ThemeChooserComponent implements OnInit {

  constructor(private sessionService: SessionService, private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  selectTheme(theme: string) {
    this.sessionService.setItem("selected-theme", theme);
    this.themeService.selectTheme(theme);
  }

}
