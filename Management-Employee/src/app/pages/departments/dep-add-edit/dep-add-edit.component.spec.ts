import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepAddEditComponent } from './dep-add-edit.component';

describe('DepAddEditComponent', () => {
  let component: DepAddEditComponent;
  let fixture: ComponentFixture<DepAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
