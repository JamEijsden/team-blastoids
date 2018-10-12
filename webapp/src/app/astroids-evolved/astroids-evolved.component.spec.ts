import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroidsEvolvedComponent } from './astroids-evolved.component';

describe('AstroidsEvolvedComponent', () => {
  let component: AstroidsEvolvedComponent;
  let fixture: ComponentFixture<AstroidsEvolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstroidsEvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstroidsEvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
