import { Component,inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MiembrosService } from '../../Service/miembros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnDestroy{
private sub: Subscription = new Subscription();
router = inject(Router);

colorservice = inject(MiembrosService);
colormain = this.colorservice.maincolor;

constructor() {
this.router.events.subscribe(event => {
  if(event instanceof NavigationEnd){
   const navbar = document.querySelector('.navbar-collapse.show') as HTMLElement
  if(navbar){
    navbar.classList.remove('show');
  }
  };
})
  
}
ngOnDestroy(): void {
this.sub.unsubscribe();  
}
scrollform() {
  const formElement = document.getElementById('form');  
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
}

scrollabout() {
  const aboutElement = document.getElementById('about');  
  if (aboutElement) {
    aboutElement.scrollIntoView({ behavior: 'smooth' });
  }
  
}
}
