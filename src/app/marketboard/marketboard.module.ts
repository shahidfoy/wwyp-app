import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketboardRoutingModule } from './marketboard-routing.module';
import { MarketboardComponent } from './marketboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { NewContractModalComponent } from './new-contract-modal/new-contract-modal.component';
import { ContractComponent } from './contract/contract.component';
import { NewOfferModalComponent } from './new-offer-modal/new-offer-modal.component';
import { NotificationsComponent } from './notifications/notifications.component';



@NgModule({
  declarations: [
    ContractComponent,
    EditProfileModalComponent,
    InquiriesComponent,
    MarketboardComponent,
    NewContractModalComponent,
    NewOfferModalComponent,
    NotificationsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketboardRoutingModule,
  ]
})
export class MarketboardModule { }
