import { Component, ViewChild, Inject } from "@angular/core";
import { FileUploaderComponent } from "src/app/shared/file-uploader/file-uploader.component";
import {
  IArtista,
  IObra,
  IDialogBody,
} from "src/app/interface/interface.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ArchivosService } from "src/app/services/archivos.service";

@Component({
  selector: "app-form-upload-image",
  templateUrl: "./form-upload-image.component.html",
  styleUrls: ["./form-upload-image.component.styl"],
})
export class FormUploadImageComponent {
  @ViewChild("uploader", { static: true }) uploader: FileUploaderComponent;

  private objeto: IArtista | IObra;
  private path: string;
  private isSubmitting: boolean;
  uploadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormUploadImageComponent>,
    private snackBar: MatSnackBar,
    private archService: ArchivosService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogdata: IDialogBody<IArtista | IObra>
  ) {
    this.objeto = dialogdata.data;
    this.path = dialogdata.path;
    this.isSubmitting = false;
    this.uploadForm = this.formBuilder.group({
      archivos: [],
      objeto: [this.objeto.id],
    });
  }

  private onSubmit(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.uploader.files.length > 0) {
      this.isSubmitting = true;
      var formData = new FormData();
      formData.append("objeto", this.uploadForm.get("objeto").value);
      for (var i = 0; i < this.uploader.files.length; i++) {
        this.uploadForm.get("archivos").setValue(this.uploader.files[i]);
        formData.append("archivos", this.uploadForm.get("archivos").value);
      }
      this.archService.guardarImagen(formData, this.path).subscribe(
        (resul: any) =>
          this.submitSuccess(`Se ha guardado correctamente la imagen`),
        () => this.submitError(`No se ha podido guardar la imagen`)
      );
    }
  }

  private submitSuccess(strSuccess: string) {
    this.isSubmitting = false;
    this.showError(strSuccess, "success");
    this.dialogRef.close();
  }

  private submitError(strError: string) {
    this.isSubmitting = false;
    this.showError(strError, "error");
  }

  private showError(
    strError: string,
    clase: string = "",
    time: number = 2000,
    pos: MatSnackBarVerticalPosition = "bottom"
  ) {
    this.snackBar.open(strError, "", {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }
}
