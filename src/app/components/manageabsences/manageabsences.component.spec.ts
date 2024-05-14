import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageabsencesComponent } from './manageabsences.component';

describe('ManageabsencesComponent', () => {
  let component: ManageabsencesComponent;
  let fixture: ComponentFixture<ManageabsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageabsencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageabsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
