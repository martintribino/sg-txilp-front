import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
  IEspacio,
  MSGTIME,
  EspacioEstadoTipo,
  ActionTipo,
} from "src/app/interface/interface.model";
import { BehaviorSubject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { EspacioService } from "src/app/services/espacio.service";
import { FormEspacioComponent } from "src/app/dialog/form-espacio/form-espacio.component";

@Component({
  selector: "app-espacios",
  templateUrl: "./espacios.component.html",
  styleUrls: ["./espacios.component.styl"],
})
export class EspaciosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IEspacio>;
  private espaciosSubject = new BehaviorSubject<Array<IEspacio>>([]);
  obs: BehaviorSubject<Array<IEspacio>>;
  private loading: boolean = false;
  private pageSizeOptions: number[] = [5, 10, 20];
  private displayedColumns: Array<string> = [
    "nombre",
    "descripcion",
    "capacidad",
    "condicion",
    "actions",
  ];

  constructor(
    private espacioServ: EspacioService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.espaciosSubject.next([]);
    this.dataSource = new MatTableDataSource<IEspacio>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.espacioServ.getEspacios().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IEspacio>) {
    //this.espaciosSubject.next(result);
    this.changeDataSource(result);
    this.loading = false;
  }

  private changeDataSource(result: Array<IEspacio>) {
    this.espaciosSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IEspacio>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onError(error) {
    this.espaciosSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  onCreate() {
    let espacio: IEspacio = {
      id: null,
      nombre: "",
      descripcion: "",
      capacidad: 0,
      condicion: EspacioEstadoTipo.Abierto,
      direccion: null,
    };
    const body = { action: ActionTipo.crear, data: espacio },
      dialogRef = this.dialog.open(FormEspacioComponent, {
        maxWidth: "550px",
        maxHeight: "100%",
        height: "auto",
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let esp: IEspacio = result;
      if (esp != null) {
        this.espacioServ.crearEspacio(esp).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente el espacio ${esp.nombre}`,
              "success"
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear el espacio ${esp.nombre}`,
              "error"
            );
          }
        );
      }
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource.data != null && this.dataSource.data.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private mostrarMensaje(
    strError: string,
    clase: string = "",
    time: number = MSGTIME,
    pos: MatSnackBarVerticalPosition = "bottom"
  ) {
    this.snackBar.open(strError, "", {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }
}
