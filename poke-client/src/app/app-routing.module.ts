import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {OverviewComponent} from "./overview/overview.component";
import {InventoryComponent} from "./inventory/inventory.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'overview', component: OverviewComponent,
  },
  {
    path: 'inventory', component: InventoryComponent,
  },
  {
    path: '', component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
