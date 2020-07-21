import { NgModule } from '@angular/core';

import { EdicionesComponent } from './ediciones.component';
import { EdicionesRoutingModule } from './ediciones-routing.module';

@NgModule({
  imports: [EdicionesRoutingModule],
  declarations: [EdicionesComponent],
  providers: [],
})
export class EdicionesModule {}
