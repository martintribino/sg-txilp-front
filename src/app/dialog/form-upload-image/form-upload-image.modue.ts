import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { FileUploaderModule } from "src/app/shared/file-uploader/file-uploader.module";
import { FormUploadImageComponent } from "./form-upload-image.component";
import {
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FileUploaderModule,
  ],
  declarations: [FormUploadImageComponent],
  exports: [FormUploadImageComponent],
  entryComponents: [FormUploadImageComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormUploadImageModule {}
