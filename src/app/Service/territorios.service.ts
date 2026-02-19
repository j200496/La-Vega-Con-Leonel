import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Territorio } from '../Components/Core/Territorio';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TerritoriosService {

private urllocal = 'https://localhost:7045';
private urlprod = environment.apiUrl;
http = inject(HttpClient)

GetallTerritorios(): Observable<Territorio[]>{
return this.http.get<Territorio[]>(`${this.urlprod}/api/Territorio`);
}
}
