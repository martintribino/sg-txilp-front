import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [CommonModule, MatListModule, MatSidenavModule, RouterModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [],
})
export class SidebarModule {}
