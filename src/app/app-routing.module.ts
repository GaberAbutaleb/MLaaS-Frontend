import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HierarchicalComponent } from './clustering/scikit-learn/hierarchical/hierarchical.component';
import { KmeansComponent } from './clustering/scikit-learn/kmeans/kmeans.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: 'clustering', children: [
    { path: 'scikitlearn/kmeans', component: KmeansComponent },
    {path: 'scikitlearn/hierarchical', component:HierarchicalComponent}
  ]
},{ path: 'RefreshComponent', component: KmeansComponent }
,{ path: 'RefreshHierComponent', component: HierarchicalComponent }
,{ path: '', redirectTo: '/homepage', pathMatch: 'full' }
,{ path: 'login', component: LoginComponent },
{ path: 'homepage', component: KmeansComponent , canActivate: [AuthGuardService] },
{path:'signup', component : SignupComponent}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
