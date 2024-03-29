import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {DataViewModule} from "primeng/dataview";
import {ColorPickerModule} from "primeng/colorpicker";
import {SplitterModule} from "primeng/splitter";
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
    exports: [
        InputTextModule,
        PasswordModule,
        DividerModule,
        DropdownModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        MessageModule,
        CardModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule,
        MessagesModule,
        DataViewModule,
        ColorPickerModule,
        SplitterModule,
        FieldsetModule,
    ]
})
export class NgPrimeModule { }
