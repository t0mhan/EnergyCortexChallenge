import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home.mod/home.module';
import { HomeComponent } from './home.mod/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home.mod/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
