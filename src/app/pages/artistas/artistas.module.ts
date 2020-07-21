import { NgModule } from '@angular/core';

import { ArtistasComponent } from './artistas.component';
import { ArtistasRoutingModule } from './artistas-routing.module';

@NgModule({
  imports: [ArtistasRoutingModule],
  declarations: [ArtistasComponent],
  providers: [],
})
export class ArtistasModule {}
