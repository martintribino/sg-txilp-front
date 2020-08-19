import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";
import { FileUploaderComponent } from "./file-uploader.component";
import { MatChipsModule } from "@angular/material/chips";
import {
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    FormsModule,
  ],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent],
  entryComponents: [FileUploaderComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FileUploaderModule {}
