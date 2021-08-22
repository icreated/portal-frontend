import {NgModule} from '@angular/core';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AppCommonModule} from 'src/app/app.common.module';
import {HeaderBreadCrumbModule} from '../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import {ThemeChooserComponent} from './theme-chooser/theme-chooser.component';

@NgModule({
    declarations: [SettingsComponent, ChangePasswordComponent, ThemeChooserComponent],
    imports: [
        SettingsRoutingModule,
        AppCommonModule,
        HeaderBreadCrumbModule,
    ],
})
export class SettingsModule {
}
