import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {PanelModule} from 'primeng/panel';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppCommonModule} from 'src/app/app.common.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HeaderBreadCrumbModule} from '../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import {ThemeChooserComponent} from './theme-chooser/theme-chooser.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
    declarations: [SettingsComponent, ChangePasswordComponent, ThemeChooserComponent],
    imports: [
        PanelModule,
        CommonModule,
        SettingsRoutingModule,
        AppCommonModule,
        HeaderBreadCrumbModule,
        DropdownModule
    ],
})
export class SettingsModule {
}
