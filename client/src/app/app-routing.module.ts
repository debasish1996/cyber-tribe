import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './config/auth-guard';
import { LoadingComponent } from './shared/loading/loading.component';
import { AccountResolver } from './util/data-resolver';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./snowpath/snowpath.module').then((m) => m.SnowpathModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
