import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

import { MapModule } from 'src/app/shared/map/map.module';

@NgModule({
  imports: [CommonModule, FormsModule, MapModule],
  declarations: [],
  exports: [],
  entryComponents: [],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormDireccionModule {}
