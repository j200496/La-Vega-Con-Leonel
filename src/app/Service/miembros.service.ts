import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Miembros } from '../Components/Core/Miembros';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MiembrosService {
private urlpersonas = 'https://localhost:7052/api/Personas';
private urlprovincias = "https://localhost:7052/api/Provicias";
private urllocal = 'https://localhost:7045/'
private urlprod = environment.apiUrl;

http = inject(HttpClient);
getprovincias(): Observable<any> {
  return this.http.get<any>(`${this.urlprod}/api/Territorio`);
}
postpersonas(data: Miembros){
return this.http.post(`${this.urlprod}/api/Miembros`, data);
}
 success(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: "success",
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
  error(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: "error",
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
}
