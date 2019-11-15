import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material';

import { AggregationFunction } from '../model/aggregationfunction';
import { DataMindsphereService } from '../services/data-mindsphere.service';
import { SectionDataComponent } from './section-data.component';
import { SectionDataUiButtonsComponent } from '../ui/section-data-ui-buttons.component';
import { SectionDataUiComponent } from '../ui/section-data-ui.component';
import { SectionDataUiGraphComponent } from '../ui/section-data-ui-graph.component';

describe('SectionDataComponentComponent', () => {
  let component: SectionDataComponent;
  let fixture: ComponentFixture<SectionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionDataComponent,
        SectionDataUiButtonsComponent,
        SectionDataUiComponent,
        SectionDataUiGraphComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatSelectModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a ui component', () => {
    expect(fixture.debugElement.query(By.directive(SectionDataUiComponent))).toBeTruthy();
  });

  it('should forward selectionDataChange to service', () => {
    const apiService: DataMindsphereService = TestBed.get(DataMindsphereService);
    apiService.selectionData.subscribe(res => expect(res.aspectVariable.variable).toBe('MyTestVar'));

    fixture.debugElement
      .query(By.directive(SectionDataUiComponent)).componentInstance
      .selectionDataChanged.emit({
        aspectVariable: {
          aspect: 'TestAspect',
          variable: 'MyTestVar'
        },
        aggregationFunction: AggregationFunction.Average
      });
  });
});
