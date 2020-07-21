import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ObrasComponent } from './obras.component';

const routes: Routes = [
  {
    path: '',
    component: ObrasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObrasRoutingModule {}
