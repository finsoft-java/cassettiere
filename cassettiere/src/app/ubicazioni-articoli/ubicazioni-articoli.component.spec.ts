import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicazioniArticoliComponent } from './ubicazioni-articoli.component';

describe('UbicazioniArticoliComponent', () => {
  let component: UbicazioniArticoliComponent;
  let fixture: ComponentFixture<UbicazioniArticoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicazioniArticoliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicazioniArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
