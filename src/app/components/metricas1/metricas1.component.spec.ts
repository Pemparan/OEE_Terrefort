import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Metricas1Component } from './metricas1.component';

describe('Metricas1Component', () => {
  let component: Metricas1Component;
  let fixture: ComponentFixture<Metricas1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Metricas1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Metricas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
