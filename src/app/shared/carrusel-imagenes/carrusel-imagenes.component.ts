import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-carrusel-imagenes",
  templateUrl: "./carrusel-imagenes.component.html",
  styleUrls: ["./carrusel-imagenes.component.styl"],
})
export class CarruselImagenesComponent implements OnInit {
  @Input() slides: Array<string> = [];

  constructor() {}

  ngOnInit(): void {}
}
