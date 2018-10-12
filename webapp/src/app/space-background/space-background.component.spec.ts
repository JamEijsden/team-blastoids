import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBackgroundComponent } from './space-background.component';

describe('SpaceBackgroundComponent', () => {
  let component: SpaceBackgroundComponent;
  let fixture: ComponentFixture<SpaceBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
