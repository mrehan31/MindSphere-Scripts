import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SectionDataComponent } from './sections/data/component/section-data.component';
import { SectionDataUiButtonsComponent } from './sections/data/ui/section-data-ui-buttons.component';
import { SectionDataUiComponent } from './sections/data/ui/section-data-ui.component';
import { SectionDataUiGraphComponent } from './sections/data/ui/section-data-ui-graph.component';
import { SectionMaintenanceComponent } from './sections/maintenance/component/section-maintenance.component';
import { SectionMaintenanceUiComponent } from './sections/maintenance/ui/section-maintenance-ui.component';
import { SectionMaintenanceUiFormComponent } from './sections/maintenance/ui/section-maintenance-ui-form.component';
import { SectionOverviewComponent } from './sections/overview/component/section-overview.component';
import { SectionOverviewUiComponent } from './sections/overview/ui/section-overview-ui.component';
import { SectionOverviewUiEditComponent } from './sections/overview/ui/section-overview-ui-edit.component';
import { SectionOverviewUiReadonlyComponent } from './sections/overview/ui/section-overview-ui-readonly.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    (window as any)._mdsp = { init: () => { } };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTableModule
      ],
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
        SectionOverviewUiReadonlyComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mindsphere-training-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('mindsphere-training-app');
  });

  it('should render a SectionOverviewUi component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-section-overview-ui')).toBeTruthy();
  });
});
