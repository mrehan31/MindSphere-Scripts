import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { take } from 'rxjs/operators';

import { AssetData } from '../model/asset-data';
import { CancelEdit } from '../model/cancel-edit';
import { SectionOverviewUiEditComponent } from './section-overview-ui-edit.component';
import { HttpClientModule } from '@angular/common/http';

describe('SectionOverviewUiEditComponent', () => {
  let component: SectionOverviewUiEditComponent;
  let fixture: ComponentFixture<SectionOverviewUiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionOverviewUiEditComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewUiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a deep copy of assetData during instantiation', () => {
    const assetData: AssetData = {
      name: 'A',
      description: 'B',
      variables: [
        { name: 'varA', value: 'valB'}
      ]
    };

    component.assetData = assetData;
    component.ngOnInit();

    expect(component.assetDataClone).not.toBe(assetData);
    expect(component.assetDataClone.variables).not.toBe(assetData.variables);
    expect(component.assetDataClone.variables[0]).not.toBe(assetData.variables[0]);
    expect(component.assetDataClone).toEqual(assetData);
  });

  it('should display name in name edit field', () => {
    component.assetDataClone.name = 'Test_Name';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('input[placeholder=Name]')).nativeElement.value).toContain('Test_Name');
    });
  });

  it('should write name to assetDataClone.name', () => {
    const inputField = fixture.debugElement.query(By.css('input[placeholder=Name]')).nativeElement;
    inputField.value = 'New_Name';
    inputField.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.assetDataClone.name).toBe('New_Name');
    });

  });

  it('should display description in description edit field', () => {
    component.assetDataClone.description = 'Test_Description';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('input[placeholder=Description]')).nativeElement.value).toContain('Test_Description');
    });
  });

  it('should write description to assetDataClone.description', () => {
    const inputField = fixture.debugElement.query(By.css('input[placeholder=Description]')).nativeElement;
    inputField.value = 'New_Description';
    inputField.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.assetDataClone.description).toBe('New_Description');
    });

  });

  it('should map variable names to placeholders', () => {
    component.assetDataClone.variables = [
      { name: 'A', value: 'valueA' },
      { name: 'B', value: 'valueB' }
    ];
    fixture.detectChanges();

    const variableInputs = fixture.debugElement
      .queryAll(By.css('.edit-container-variables mat-form-field'))
      .map(formField => formField.nativeElement.textContent);

    component.assetDataClone.variables.forEach(variable => {
      expect(variableInputs)
        .toContain(variable.name);
    });
  });

  it('should map variable values to input values', () => {
    component.assetDataClone.variables = [
      { name: 'A', value: 'valueA' },
      { name: 'B', value: 'valueB' }
    ];
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const variableValues = fixture.debugElement
        .queryAll(By.css('.edit-container-variables mat-form-field input'))
        .map(inputField => inputField.nativeElement.value);

      component.assetDataClone.variables.forEach(value => {
        expect(variableValues).toContain(value.value);
      });
    });
  });

  it('should write new value to single variable', () => {
    component.assetDataClone.variables = [
      { name: 'varA', value: 'valueA' }
    ];
    fixture.detectChanges();

    const variableInput = fixture.debugElement.query(By.css('input[placeholder=varA]')).nativeElement;
    variableInput.value = 'New_Value';
    variableInput.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.assetDataClone.variables[0].value).toBe('New_Value');
    });
  });

  it('should write new value to first variable when there are two', () => {
    component.assetDataClone.variables = [
      { name: 'varA', value: 'valueA' },
      { name: 'varB', value: 'valueB'}
    ];
    fixture.detectChanges();

    const variableInput = fixture.debugElement.query(By.css('input[placeholder=varA]')).nativeElement;
    variableInput.value = 'New_Value';
    variableInput.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.assetDataClone.variables[0].value).toBe('New_Value');
    });
  });

  it('should write new value to second variable when there are two', () => {
    component.assetDataClone.variables = [
      { name: 'varA', value: 'valueA' },
      { name: 'varB', value: 'valueB' }
    ];
    fixture.detectChanges();

    const variableInput = fixture.debugElement.query(By.css('input[placeholder=varB]')).nativeElement;
    variableInput.value = 'New_Value';
    variableInput.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.assetDataClone.variables[1].value).toBe('New_Value');
    });
  });

  it('should emit an assetDataChange event when hitting Submit', () => {
    component.assetDataClone.variables = [
      { name: 'varA', value: 'valueA' },
      { name: 'varB', value: 'valueB' }
    ];
    fixture.detectChanges();

    component.assetDataChange
      .pipe(take(1))
      .subscribe(assetData => expect(assetData).toBe(component.assetDataClone));

    fixture.debugElement.query(By.css('#edit-submit-button')).nativeElement.click();
    fixture.detectChanges();

    component.assetDataChange.emit({} as AssetData);
  });

  it('should emit an cancelButtonClick event when hitting Cancel', () => {
    const dummyEvent = new CancelEdit();

    component.cancel
      .pipe(take(1))
      .subscribe(e => expect(e).not.toBe(dummyEvent));

    fixture.debugElement.query(By.css('#edit-cancel-button')).nativeElement.click();
    fixture.detectChanges();

    component.cancel.emit(dummyEvent);
  });
});
