import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoOperazioniComponent } from './storico-operazioni.component';

describe('StoricoOperazioniComponent', () => {
  let component: StoricoOperazioniComponent;
  let fixture: ComponentFixture<StoricoOperazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoOperazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoOperazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
