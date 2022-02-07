import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KmeansComponent } from './clustering/scikit-learn/kmeans/kmeans.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [{
  path: 'clustering', children: [
    { path: 'scikitlearn/kmeans', component: KmeansComponent }
  ]
},{ path: 'RefreshComponent', component: KmeansComponent }
,{ path: '', redirectTo: '/homepage', pathMatch: 'full' }
,{ path: 'login', component: LoginComponent },
{ path: 'homepage', component: KmeansComponent , canActivate: [AuthGuardService] }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
