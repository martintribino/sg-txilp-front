import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  Avatar1Component,
  Avatar2Component,
  Avatar3Component,
  Avatar4Component,
  Avatar5Component,
  Avatar6Component,
  NoAvatarComponent,
} from './avatars.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [
    Avatar1Component,
    Avatar2Component,
    Avatar3Component,
    Avatar4Component,
    Avatar5Component,
    Avatar6Component,
    NoAvatarComponent,
  ],
  exports: [
    Avatar1Component,
    Avatar2Component,
    Avatar3Component,
    Avatar4Component,
    Avatar5Component,
    Avatar6Component,
    NoAvatarComponent,
  ],
  providers: [],
})
export class AvatarsModule {}
