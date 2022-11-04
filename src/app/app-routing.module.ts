import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./Views/main/main.component";
import {SyncMenuComponent} from "./Views/sync-menu/sync-menu.component";
import {SyncedGuard} from "./Bloc/Guards/synced.guard";

const routes: Routes = [
  {
    path:':id',
    component:MainComponent,
    canActivate:[SyncedGuard]
  },
  {
    path:'',
    component:MainComponent,
    canActivate:[SyncedGuard]
  },

  {
    path:'sync-menu',
    component:SyncMenuComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
