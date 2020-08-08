import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MapModule } from './map/map.module';

@NgModule({
  imports: [NavbarModule, SidebarModule, MapModule],
  exports: [NavbarModule, SidebarModule, MapModule],
  declarations: [],
})
export class SharedModule {}
