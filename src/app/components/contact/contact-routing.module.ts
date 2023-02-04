import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactDetailsComponent} from "./contact-details/contact-details.component";

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: ':id',
    component: ContactDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
