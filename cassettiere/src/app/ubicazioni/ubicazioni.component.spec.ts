import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicazioniComponent } from './ubicazioni.component';

describe('UbicazioniComponent', () => {
  let component: UbicazioniComponent;
  let fixture: ComponentFixture<UbicazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
