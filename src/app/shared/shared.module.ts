import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [NavbarModule, SidebarModule],
  exports: [NavbarModule, SidebarModule],
  declarations: [],
})
export class SharedModule {}
