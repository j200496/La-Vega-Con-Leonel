import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Territorio } from '../Core/Territorio';
import { TerritoriosService } from '../../Service/territorios.service';
import { Categorias } from '../Core/Categorias';
import { CategoriasService } from '../../Service/categorias.service';
import { ReportService } from '../../Service/report.service';
import { MiembrosService } from '../../Service/miembros.service';
@Component({
  selector: 'app-reportsform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reportsform.component.html',
  styleUrl: './reportsform.component.css'
})
export class ReportsformComponent implements OnInit {
  private readonly territoriosService = inject(TerritoriosService);
 private readonly categoriasService = inject(CategoriasService);
 private readonly reportService = inject(ReportService);
 private readonly miembrosService = inject(MiembrosService);
  territorios: Territorio[] = [];
  categorias: Categorias[] = [];
  submitError = '';
  territoriosError = '';
  categoriasError = '';
  selectedfoto: File | null = null;
  reportForm = new FormGroup({
    idTerritorio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    idCategoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    telefono: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    direccion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  GetTerritorios(){
this.territoriosService.GetallTerritorios().subscribe({
      next: (territorios) => {
        this.territorios = territorios;
      },
      error: () => {
        this.territoriosError = 'No fue posible cargar los sectores. Intenta nuevamente más tarde.';
      }
    });
  }
  GetCategorias(){
    this.categoriasService.GetallCategorias().subscribe({
      next: (categorias) => { 
        this.categorias = categorias;
      },
      error: () => {
        this.categoriasError = 'No fue posible cargar las categorias. Intenta nuevamente más tarde.';
      }
    });
  }

  ngOnInit(): void {
    this.GetTerritorios();
    this.GetCategorias();
  }
 AddReporte(): void {
  if (this.reportForm.invalid) {
    this.reportForm.markAllAsTouched();
    return;
  }

  const values = this.reportForm.getRawValue();
  const report = new FormData();
  

  report.append('idTerritorio', values.idTerritorio.toString());
  report.append('idCategoria', values.idCategoria.toString());
  

  report.append('nombre', values.nombre);
  report.append('telefono', values.telefono);
  report.append('correo', values.correo);
  report.append('direccion', values.direccion);
  report.append('descripcion', values.descripcion);

 
  if (this.selectedfoto) {
    report.append('fotourl', this.selectedfoto, this.selectedfoto.name);
  }

  this.submitError = '';
  this.reportService.AddReport(report).subscribe({
    next: (response) => {
      console.log('Reporte agregado exitosamente:', response);
      this.miembrosService.success('Reporte enviado', 'El reporte ha sido enviado exitosamente, nuestro equipo se contactará contigo.', '#45971e');
      this.reportForm.reset();
      this.selectedfoto = null;
    },
    error: (error) => {
      this.submitError = 'No fue posible enviar el reporte. Intenta nuevamente más tarde.';
      console.error('Error al agregar el reporte:', error);
    }
  });
}

  onFilesSelected(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.selectedfoto = input.files?.[0] ?? null;
    }
  }

  removeFoto(input: HTMLInputElement): void {
    this.selectedfoto = null;
    input.value = '';
  }
}
