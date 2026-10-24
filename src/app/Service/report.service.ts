import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reportes } from '../Components/Core/Reportes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

http = inject(HttpClient);
private urllocal = 'https://localhost:7045';

AddReport(formData: FormData){
  return this.http.post(`${this.urllocal}/api/Reporte`, formData);

}
}
