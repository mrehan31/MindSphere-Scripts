import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SectionDataComponent } from './sections/data/component/section-data.component';
import { SectionDataUiButtonsComponent } from './sections/data/ui/section-data-ui-buttons.component';
import { SectionDataUiComponent } from './sections/data/ui/section-data-ui.component';
import { SectionDataUiGraphComponent } from './sections/data/ui/section-data-ui-graph.component';
import { SectionMaintenanceUiComponent } from './sections/maintenance/ui/section-maintenance-ui.component';
import { SectionMaintenanceUiFormComponent } from './sections/maintenance/ui/section-maintenance-ui-form.component';
import { SectionOverviewComponent } from './sections/overview/component/section-overview.component';
import { SectionOverviewUiComponent } from './sections/overview/ui/section-overview-ui.component';
import { SectionOverviewUiEditComponent } from './sections/overview/ui/section-overview-ui-edit.component';
import { SectionOverviewUiReadonlyComponent } from './sections/overview/ui/section-overview-ui-readonly.component';
import { SectionMaintenanceComponent } from './sections/maintenance/component/section-maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    SectionDataComponent,
    SectionDataUiButtonsComponent,
    SectionDataUiComponent,
    SectionDataUiGraphComponent,
    SectionMaintenanceComponent,
    SectionMaintenanceUiComponent,
    SectionMaintenanceUiFormComponent,
    SectionOverviewComponent,
    SectionOverviewUiComponent,
    SectionOverviewUiEditComponent,
    SectionOverviewUiEditComponent,
    SectionOverviewUiReadonlyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
