import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdd } from './partient-add';

describe('PatientAdd', () => {
  let component: PartientAdd;
  let fixture: ComponentFixture<PartientAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartientAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(PartientAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
