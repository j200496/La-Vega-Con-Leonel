import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MiembrosService } from '../../Service/miembros.service';
import { Territorio } from '../Core/Territorio';
import { TerritoriosService } from '../../Service/territorios.service';
import { Miembros } from '../Core/Miembros';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit{
service = inject(MiembrosService);
territorioservice = inject(TerritoriosService)
provincias!: any[];
arrayprovincias: any[] = [
  "Jima abajo",
  "Barranca",
  "Bacui",
  "Las yerbas",
  "La sabana de los jimenez",
  "Las uvas",
  "La vega",
  "Ranchito"
];
territorios:Territorio[] = [];

usuariosform = new FormGroup({
  nombre: new FormControl("", {nonNullable: true}),
  telefono: new FormControl("",{nonNullable: true}),
  direccion: new FormControl('',{nonNullable: true}),
  colegioElectoral: new FormControl("",{nonNullable: true}),
  idTerritorio: new FormControl(0,{nonNullable: true}),
})
ngOnInit(): void {
this.GetTerritorios();
}
GetTerritorios(){
this.territorioservice.GetallTerritorios().subscribe(t => {
  this.territorios = t;
})
}

guardar(){
  const {nombre,telefono,direccion,colegioElectoral,idTerritorio} = this.usuariosform.value;
  if(!nombre || !telefono || !direccion || !colegioElectoral || !idTerritorio){
    this.service.error("Todos los campos son requeridos","Error","red");
    return;
  }

  const formulario = this.usuariosform.getRawValue(); 
    console.log(formulario)
  this.service.postpersonas(formulario).subscribe(() =>{
    this.service.success("Datos enviados exitosamente!","Gracias!","green");
    this.usuariosform.reset({
      idTerritorio: 0
    })

  })
}
}
