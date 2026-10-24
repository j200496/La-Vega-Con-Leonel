import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categorias } from '../Components/Core/Categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  http = inject(HttpClient)
  private urllocal = 'https://localhost:7045';

  GetallCategorias():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(`${this.urllocal}/api/Categoria`);
  }

}
