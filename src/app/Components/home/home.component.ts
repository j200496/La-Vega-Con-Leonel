import { Component,inject, OnDestroy } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from "../header/header.component";
import { FormComponent } from "../form/form.component";
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MiembrosService } from '../../Service/miembros.service';

@Component({
  selector: 'app-home',
  imports: [ FormComponent, FooterComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
colorservice = inject(MiembrosService);
colormain = this.colorservice.maincolor;


scrollform() {
  const formElement = document.getElementById('form');  
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
  
}

/*  <a
      href="https://wa.me/18090000000"
      class="whatsapp-float"
      target="_blank"
      aria-label="WhatsApp"
    >
      <i class="bi bi-whatsapp"></i>
    </a> */
}
