import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSegnalazioniComponent } from './report-segnalazioni.component';

describe('ReportSegnalazioniComponent', () => {
  let component: ReportSegnalazioniComponent;
  let fixture: ComponentFixture<ReportSegnalazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSegnalazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSegnalazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
