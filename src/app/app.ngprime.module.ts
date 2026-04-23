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
import { PopoverModule } from 'primeng/popover';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TextareaModule } from 'primeng/textarea';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {SelectModule} from 'primeng/select';
import {DataViewModule} from "primeng/dataview";
import {ColorPickerModule} from "primeng/colorpicker";
import {SplitterModule} from "primeng/splitter";
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
    exports: [
        InputTextModule,
        PasswordModule,
        DividerModule,
        SelectModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        MessageModule,
        CardModule,
        ProgressSpinnerModule,
        PopoverModule,
        BreadcrumbModule,
        DatePickerModule,
        DrawerModule,
        DynamicDialogModule,
        TextareaModule,
        DataViewModule,
        ColorPickerModule,
        SplitterModule,
        FieldsetModule,
    ]
})
export class NgPrimeModule { }
