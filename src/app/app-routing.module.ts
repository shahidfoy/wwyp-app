import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'marketboard',
    loadChildren: () => import ('./marketboard/marketboard.module').then(m => m.MarketboardModule)
  },
  // TODO:: implment support portal for employee access
  // TODO:: only authorized users with role access greater then user can access
  // { path: 'support-portal' },
  { path: '**', pathMatch: 'full', redirectTo: '/404' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
