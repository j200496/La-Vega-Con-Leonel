import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Territorio } from '../Core/Territorio';
import { TerritoriosService } from '../../Service/territorios.service';

@Component({
  selector: 'app-reportsform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reportsform.component.html',
  styleUrl: './reportsform.component.css'
})
export class ReportsformComponent implements OnInit {
  private readonly territoriosService = inject(TerritoriosService);

  @Output() reportSubmit = new EventEmitter<FormData>();

  territorios: Territorio[] = [];
  selectedFiles: File[] = [];
  territoriosError = '';

  reportForm = new FormGroup({
    idTerritorio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    telefono: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    direccion: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  ngOnInit(): void {
    this.territoriosService.GetallTerritorios().subscribe({
      next: (territorios) => {
        this.territorios = territorios;
      },
      error: () => {
        this.territoriosError = 'No fue posible cargar los sectores. Intenta nuevamente más tarde.';
      }
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.selectedFiles = Array.from(input.files ?? []);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles = this.selectedFiles.filter((_, fileIndex) => fileIndex !== index);
  }

  submitReport(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const values = this.reportForm.getRawValue();
    const report = new FormData();
    report.append('idTerritorio', values.idTerritorio);
    report.append('nombre', values.nombre);
    report.append('telefono', values.telefono);
    report.append('correo', values.correo);
    report.append('direccion', values.direccion);
    this.selectedFiles.forEach((file) => report.append('fotos', file));

    this.reportSubmit.emit(report);
  }
}
