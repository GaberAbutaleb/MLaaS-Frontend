import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DBScanComponent } from './clustering/scikit-learn/dbscan/dbscan.component';
import { DisplayUserModelsComponent } from './clustering/scikit-learn/display-user-models/display-user-models.component';
import { HierarchicalComponent } from './clustering/scikit-learn/hierarchical/hierarchical.component';
import { KmeansComponent } from './clustering/scikit-learn/kmeans/kmeans.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: 'clustering', children: [
    { path: 'scikitlearn/kmeans', component: KmeansComponent },
    {path: 'scikitlearn/hierarchical', component:HierarchicalComponent},
    {path:'scikitlearn/DisUsrModel',component:DisplayUserModelsComponent},
    {path: 'scikitlearn/DBScan', component :DBScanComponent}
  ]
},{ path: 'RefreshComponent', component: KmeansComponent },
{path:'RefreshDBScComponent', component:DBScanComponent},
{path:'RefreshDisplayUser', component:DisplayUserModelsComponent}
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
