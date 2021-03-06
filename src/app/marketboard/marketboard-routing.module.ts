import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ContractComponent } from './contract/contract.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { MarketboardComponent } from './marketboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MarketboardComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'contract', component: ContractComponent },
        { path: 'notifications', component: NotificationsComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'inquiries', component: InquiriesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketboardRoutingModule {}