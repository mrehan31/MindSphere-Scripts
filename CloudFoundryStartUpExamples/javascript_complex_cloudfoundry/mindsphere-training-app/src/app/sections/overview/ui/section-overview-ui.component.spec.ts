import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';

import { CancelEdit } from '../model/cancel-edit';
import { SectionOverviewUiComponent } from './section-overview-ui.component';
import { SectionOverviewUiEditComponent } from './section-overview-ui-edit.component';
import { SectionOverviewUiReadonlyComponent } from './section-overview-ui-readonly.component';
import { take } from 'rxjs/operators';
import { AssetData } from '../model/asset-data';

describe('SectionOverviewUiComponent', () => {
  let component: SectionOverviewUiComponent;
  let fixture: ComponentFixture<SectionOverviewUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionOverviewUiComponent,
        SectionOverviewUiReadonlyComponent,
        SectionOverviewUiEditComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('generally', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should default to not being editable', () => {
      expect(component.isEditable).toBeFalsy();
    });

    it('should show the barrel in viewMode', () => {
      component.viewMode = 'read';

      expect(fixture.debugElement.query(By.css('.barrel'))).toBeTruthy();
    });
  });

  describe('when it is not editable', () => {
    beforeEach(() => {
      // Set it to the current default if it might
      // change in the future.
      component.isEditable = false;
      fixture.detectChanges();
    });

    it('should have a readonly component', () => {
      expect(fixture.debugElement.query(By.css('app-section-overview-ui-readonly'))).toBeTruthy();
    });

    it('should pass aspectData to readonly component', () => {
      const componentData = component.assetData;
      const readonlyComponentData = fixture.debugElement
        .query(By.css('app-section-overview-ui-readonly'))
        .componentInstance.assetData;

      expect(componentData).toBe(readonlyComponentData);
    });

    it('should not have an edit component', () => {
      // Set it to the current default if it might
      // change in the future.
      component.isEditable = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('app-section-overview-ui-edit'))).toBeFalsy();
    });

    it('should not have an edit button', () => {
      expect(fixture.debugElement.query(By.css('#edit-button-container'))).toBeFalsy();
    });


  });

  describe('when it is editable', () => {
    beforeEach(() => {
      component.isEditable = true;
      fixture.detectChanges();
    });

    describe('and in read mode', () => {
      beforeEach(() => {
        component.viewMode = 'read';
        fixture.detectChanges();
      });

      it('should have an edit button', () => {
        expect(fixture.debugElement.query(By.css('#edit-button-container'))).toBeTruthy();
      });

      it('should have a readonly component', () => {
        expect(fixture.debugElement.query(By.css('app-section-overview-ui-readonly'))).toBeTruthy();
      });

      it('should not have an edit component', () => {
        expect(fixture.debugElement.query(By.css('app-section-overview-ui-edit'))).toBeFalsy();
      });

      it('should switch to edit mode when clicking edit button', () => {
        fixture.debugElement.query(By.css('#edit-button-container button')).nativeElement.click();
        fixture.detectChanges();

        expect(component.viewMode).toBe('edit');
      });

      it('should emit viewModeChange when clicking edit button', () => {

        component.viewModeChange
          .pipe(take(1))
          .subscribe(viewMode => {
            expect(viewMode).toBe('edit');
          });

        fixture.debugElement.query(By.css('#edit-button-container button')).nativeElement.click();
        fixture.detectChanges();

        component.viewModeChange.emit('read');
      });
    });

    describe('and in edit mode', () => {
      beforeEach(() => {
        component.viewMode = 'edit';
        fixture.detectChanges();
      });

      it('should have an edit component', () => {
        expect(fixture.debugElement.query(By.css('app-section-overview-ui-edit'))).toBeTruthy();
      });

      it('should not have the readonly component', () => {
        expect(fixture.debugElement.query(By.css('app-section-overview-ui-readonly'))).toBeFalsy();
      });

      it('should not have an edit button', () => {
        expect(fixture.debugElement.query(By.css('#edit-button-container'))).toBeFalsy();
      });

      it('should not show the barrel', () => {
        expect(fixture.debugElement.query(By.css('.barrel'))).toBeFalsy();
      });

      it('should pass aspectData to edit component', () => {
        const componentData = component.assetData;

        const editComponentData = fixture.debugElement
          .query(By.css('app-section-overview-ui-edit'))
          .componentInstance.assetData;

        expect(componentData).toBe(editComponentData);
      });

      it('should keep assetData when edit component submits', () => {
        const assetData = {} as AssetData;

        fixture.debugElement.query(By.directive(SectionOverviewUiEditComponent)).componentInstance.assetDataChange.emit(assetData);
        fixture.detectChanges();

        expect(component.assetData).toBe(assetData);
      });

      it('should emit assetDataChange when edit component submits', () => {
        const assetData = {} as AssetData;

        component.assetDataChange
          .pipe(take(1))
          .subscribe(ad => {
            expect(ad).toBe(assetData);
          });

        fixture.debugElement.query(By.directive(SectionOverviewUiEditComponent)).componentInstance.assetDataChange.emit(assetData);
        fixture.detectChanges();

        component.assetDataChange.emit({} as AssetData);
      });

      it('should switch to read mode when an cancel edit event it emitted', () => {
        fixture.debugElement.query(By.directive(SectionOverviewUiEditComponent)).componentInstance.cancel.emit(new CancelEdit());
        fixture.detectChanges();

        expect(component.viewMode).toBe('read');
      });

      it('should emit viewModeChange when an cancel edit event it emitted', () => {
        component.viewModeChange
        .pipe(take(1))
        .subscribe(viewMode => {
          expect(viewMode).toBe('read');
        });

        fixture.debugElement.query(By.directive(SectionOverviewUiEditComponent)).componentInstance.cancel.emit(new CancelEdit());
        fixture.detectChanges();

        component.viewModeChange.emit('edit');
      });
    });
  });
});
