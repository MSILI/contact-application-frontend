import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactDetailsComponent} from "./contact-details/contact-details.component";
import {AdminGuard} from "../../guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
    data: {title: 'Liste des contacts'},
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: ContactDetailsComponent,
    data: {title: 'Detail du contact'},
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
