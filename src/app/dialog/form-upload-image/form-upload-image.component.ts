import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FileUploaderComponent } from "src/app/shared/file-uploader/file-uploader.component";
import { IArtista } from "src/app/interface/interface.model";
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

  private artista: IArtista;
  private isSubmitting: boolean;
  uploadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormUploadImageComponent>,
    private snackBar: MatSnackBar,
    private archService: ArchivosService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IArtista
  ) {
    this.artista = data;
    this.isSubmitting = false;
    this.uploadForm = this.formBuilder.group({
      archivos: [],
      artista: [this.artista.id],
    });
  }

  private onSubmit(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.uploader.files.length > 0) {
      this.isSubmitting = true;
      var formData = new FormData();
      formData.append("artista", this.uploadForm.get("artista").value);
      for (var i = 0; i < this.uploader.files.length; i++) {
        this.uploadForm.get("archivos").setValue(this.uploader.files[i]);
        formData.append("archivos", this.uploadForm.get("archivos").value);
      }
      this.archService.guardarImagen(formData).subscribe(
        (resul: any) =>
          this.artistaSuccess(
            `Se ha guardado correctamente la imagen para ${this.artista.nombre}`
          ),
        () =>
          this.artistaError(
            `No se ha podido guardar la imagen de ${this.artista.nombre}`
          )
      );
    }
  }

  private artistaSuccess(strSuccess: string) {
    this.isSubmitting = false;
    this.showError(strSuccess, "success");
    this.dialogRef.close();
  }

  private artistaError(strError: string) {
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
