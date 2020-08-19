import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCarouselModule } from "@ngmodule/material-carousel";

import { CarruselImagenesComponent } from "./carrusel-imagenes.component";
import { SecureImgModule } from "../secure-img/secure-img.module";

@NgModule({
  imports: [CommonModule, MatCarouselModule, SecureImgModule],
  declarations: [CarruselImagenesComponent],
  exports: [CarruselImagenesComponent],
  entryComponents: [CarruselImagenesComponent],
  providers: [],
})
export class CarruselImagenesModule {}
