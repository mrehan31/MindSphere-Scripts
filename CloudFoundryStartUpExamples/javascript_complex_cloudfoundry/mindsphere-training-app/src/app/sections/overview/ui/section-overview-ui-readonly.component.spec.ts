import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOverviewUiReadonlyComponent } from './section-overview-ui-readonly.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatButtonModule, MatInputModule } from '@angular/material';

describe('SectionOverviewUiReadonlyComponent', () => {
  let component: SectionOverviewUiReadonlyComponent;
  let fixture: ComponentFixture<SectionOverviewUiReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOverviewUiReadonlyComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewUiReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a default title if not provided', () => {
    expect(fixture.nativeElement.querySelector('.title').textContent).toBeTruthy();
  });

  it('should write name to title container', () => {
    component.assetData.name = 'Test name';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.title').textContent).toContain('Test name');
  });

  it('should show a default description if not provided', () => {
    expect(fixture.nativeElement.querySelector('.description').textContent).toBeTruthy();
  });

  it('should write description to description container', () => {
    component.assetData.description = 'Test description';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.description').textContent).toContain('Test description');
  });

  it('should not have a variable container if there are no variables', () => {
    // This currently is the default which could change
    // in the future so set it here explicitely.
    component.assetData.variables = [];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.vartable')).toBeFalsy();
  });

  it('should have an empty variable list as default', () => {
    expect(component.assetData.variables.length).toBe(0);
  });

  it('should show all variables in the table', () => {
    component.assetData.variables = [
      { name: 'A', value: 'valueA' },
      { name: 'B', value: 'valueB' },
      { name: 'C', value: 'valueC' }
    ];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.vartable table tbody tr').length).toBe(component.assetData.variables.length);
  });

  it('should map VariableElement in the right order', () => {
    component.assetData.variables = [{ name: 'TestName', value: 'TestValue' }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.vartable table tbody tr td:nth-child(1)').textContent).toContain('TestName');
    expect(fixture.nativeElement.querySelector('.vartable table tbody tr td:nth-child(2)').textContent).toContain('TestValue');
  });
});
