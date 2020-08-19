import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SecureImgComponent } from "./secure-img.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SecureImgComponent],
  exports: [SecureImgComponent],
  entryComponents: [SecureImgComponent],
  providers: [],
})
export class SecureImgModule {}
