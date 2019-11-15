import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SectionOverviewComponent } from './section-overview.component';
import { SectionOverviewUiComponent } from '../ui/section-overview-ui.component';
import { SectionOverviewUiEditComponent } from '../ui/section-overview-ui-edit.component';
import { SectionOverviewUiReadonlyComponent } from '../ui/section-overview-ui-readonly.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatTableModule } from '@angular/material';
import { AssetData } from '../model/asset-data';
import { of, Observable, throwError } from 'rxjs';
import { OverviewMindsphereService } from '../services/overview-mindsphere.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SectionOverviewComponent', () => {
  let component: SectionOverviewComponent;
  let fixture: ComponentFixture<SectionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionOverviewComponent,
        SectionOverviewUiComponent,
        SectionOverviewUiEditComponent,
        SectionOverviewUiReadonlyComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ui component', () => {
    expect(fixture.debugElement.query(By.directive(SectionOverviewUiComponent))).toBeTruthy();
  });

  it('should default to not editable', () => {
    expect(component.isEditable).toBeFalsy();
  });

  [true, false]
    .forEach(isEditable => {
      it(`should pass isEditable=${isEditable} to ui component`, () => {
        component.isEditable = isEditable;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(SectionOverviewUiComponent)).componentInstance.isEditable).toBe(isEditable);
      });
    });

  it('should call writeAssetData', () => {
    component.viewMode = 'edit';
    spyOn(component.overviewMindsphereService, 'writeAssetData').and.returnValue(of({} as AssetData));

    component.handleAssetDataChange({} as AssetData);
    expect(component.overviewMindsphereService.writeAssetData).toHaveBeenCalled();
  });

  it('should call switch to read mode after successful data', () => {
    component.viewMode = 'edit';
    spyOn(component.overviewMindsphereService, 'writeAssetData').and.returnValue(of({} as AssetData));

    component.handleAssetDataChange({} as AssetData);
    expect(component.viewMode).toBe('read');
  });

  it('should stay in edit mode when writeAssetData throws', () => {
    component.viewMode = 'edit';
    spyOn(component.overviewMindsphereService, 'writeAssetData').and.returnValue(throwError('Test Error'));

    component.handleAssetDataChange({} as AssetData);
    expect(component.viewMode).toBe('edit');
  });
});
