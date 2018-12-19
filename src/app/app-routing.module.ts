import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dd-routing.module#DdRoutingModule'
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.isElectron })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
