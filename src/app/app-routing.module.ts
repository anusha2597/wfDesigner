import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MappingHomeComponent } from './mapping/mapping-home/mapping-home.component';


const routes: Routes = [
  { path: 'mapping', component: MappingHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
