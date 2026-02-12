import { Component,inject, OnDestroy } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from "../header/header.component";
import { FormComponent } from "../form/form.component";
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [ FormComponent, RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
