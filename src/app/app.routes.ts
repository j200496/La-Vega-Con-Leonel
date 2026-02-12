import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { ContentComponent } from './Shared/content/content.component';
import { P1Component } from './Components/p1/p1.component';
import { P2Component } from './Components/p2/p2.component';
import { P3Component } from './Components/p3/p3.component';
import { P4Component } from './Components/p4/p4.component';
import { PropComponent } from './Components/prop/prop.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  {
    path: 'layout', component: LayoutComponent,
    children: [
      {
        path:'economia', component: P1Component
      },
      {
        path:'home',component:HomeComponent
      },
      {
        path:'seguridad',component:P2Component
      },   
     {
        path:'RelIntern',component:P3Component
      },
      {
        path:'PSociales',component:P4Component
      },
      {
        path:'prop',component:PropComponent
      }
    ]
  }
];

