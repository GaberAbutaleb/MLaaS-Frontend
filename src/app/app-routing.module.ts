import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KmeansComponent } from './clustering/scikit-learn/kmeans/kmeans.component';

const routes: Routes = [{
  path: 'clustering', children: [
    { path: 'scikitlearn/kmeans', component: KmeansComponent }
  ]
},{ path: 'RefreshComponent', component: KmeansComponent }]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
