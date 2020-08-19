import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.styl"],
})
export class FileUploaderComponent {
  @Input()
  multiple: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  accept;
  @Input()
  maxFileSize: number = 2097152;
  @Input()
  enabledFileTypes: Array<string> = [
    "image/jpg",
    "image/gif",
    "image/svg",
    "image/png",
    "image/jpeg",
    "image/vnd.microsoft.icon",
    "text/plain",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  @Input()
  invalidFileSizeMessage: string = "Tamaño máximo excedido.";
  @Input()
  invalidFileSize: boolean = false;
  @Input()
  invalidFileTypeMessage: string = "Tipo no válido.";
  @Input()
  invalidFileType: boolean = false;
  @Input()
  chooseLabel = "Elegir";
  @Input()
  deleteButtonIcon = "cancel";
  @Input()
  attachButtonIcon = "attach_file";
  @Input()
  files: File[] = [];
  @Input()
  maxQFiles: number = 4;

  @ViewChild("fileUpload", { static: true }) fileUpload: ElementRef;

  inputFileName: string;

  constructor(private sanitizer: DomSanitizer) {
    if (this.maxQFiles < 1 || this.maxQFiles > 8)
      //limites
      this.maxQFiles = 4;
  }

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event) {}

  onFileSelected(event) {
    let files = event.dataTransfer
        ? event.dataTransfer.files
        : event.target.files,
      reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        if (!this.isMultiple()) {
          this.files = [];
        }
        if (this.files.length < this.maxQFiles) {
          this.files.push(files[i]);
        }
      }
    }
  }

  private removeFile(event, file) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1);
      this.clearInputElement();
    }
  }

  private validate(file: File): boolean {
    this.invalidFileSize = false;
    this.invalidFileType = false;
    if (file.size <= 0 || file.size > this.maxFileSize) {
      this.invalidFileSize = true;
      return false;
    } else if (!this.enabledFileTypes.includes(file.type)) {
      this.invalidFileType = true;
      return false;
    }
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }

  private clearInputElement() {
    this.invalidFileSize = false;
    this.invalidFileType = false;
    this.fileUpload.nativeElement.value = "";
  }

  private isMultiple(): boolean {
    return this.multiple;
  }
}
