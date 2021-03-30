import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUbicazioniComponent } from './report-ubicazioni.component';

describe('ReportUbicazioniComponent', () => {
  let component: ReportUbicazioniComponent;
  let fixture: ComponentFixture<ReportUbicazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUbicazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUbicazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
