import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReportsformComponent } from './reportsform.component';
import { TerritoriosService } from '../../Service/territorios.service';

describe('ReportsformComponent', () => {
  let component: ReportsformComponent;
  let fixture: ComponentFixture<ReportsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsformComponent],
      providers: [{
        provide: TerritoriosService,
        useValue: { GetallTerritorios: () => of([]) }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit report data when the form is valid', () => {
    const reportSubmit = jasmine.createSpy('reportSubmit');
    component.reportSubmit.subscribe(reportSubmit);
    component.reportForm.setValue({
      idTerritorio: '1',
      nombre: 'María Pérez',
      telefono: '8095551234',
      correo: 'maria@example.com',
      direccion: 'Calle Principal 10'
    });

    component.submitReport();

    expect(reportSubmit).toHaveBeenCalled();
    const report = reportSubmit.calls.mostRecent().args[0] as FormData;
    expect(report.get('idTerritorio')).toBe('1');
    expect(report.get('correo')).toBe('maria@example.com');
  });
});
