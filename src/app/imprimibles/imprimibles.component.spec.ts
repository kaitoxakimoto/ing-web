import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimiblesComponent } from './imprimibles.component';

describe('ImprimiblesComponent', () => {
  let component: ImprimiblesComponent;
  let fixture: ComponentFixture<ImprimiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
