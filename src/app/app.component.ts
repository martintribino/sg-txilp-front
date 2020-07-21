import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent {
  open: boolean = true;

  constructor() {}

  onOpenSidebar() {
    this.open = !this.open;
  }
}
