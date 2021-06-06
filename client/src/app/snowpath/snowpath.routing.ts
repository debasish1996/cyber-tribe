import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeRouting } from './home/home.routing';
import { SnowpathComponent } from './snowpath.component';

const routes: Routes = [
  {
    path: '',
    component: SnowpathComponent,
    children: homeRouting,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SnowpathRoutingModule {}
