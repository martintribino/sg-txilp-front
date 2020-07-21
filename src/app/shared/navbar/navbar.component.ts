import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl'],
})
export class NavbarComponent implements OnInit {
  @Output() openSidebar = new EventEmitter<boolean>();
  urlMap: Map<string, string> = new Map();

  constructor() {
    this.urlMap.set('home', 'Inicio');
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.openSidebar.emit();
  }
}
