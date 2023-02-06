import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./components/contact/contact.module').then((mod) => mod.ContactModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then((mod) => mod.AccountModule)
  },
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
