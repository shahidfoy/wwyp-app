import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketboardRoutingModule } from './marketboard-routing.module';
import { MarketboardComponent } from './marketboard.component';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { NewContractModalComponent } from './new-contract-modal/new-contract-modal.component';
import { ContractComponent } from './contract/contract.component';
import { NewOfferModalComponent } from './new-offer-modal/new-offer-modal.component';



@NgModule({
  declarations: [
    ChatComponent,
    ContractComponent,
    EditProfileModalComponent,
    InquiriesComponent,
    MarketboardComponent,
    NewContractModalComponent,
    NewOfferModalComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketboardRoutingModule,
  ]
})
export class MarketboardModule { }
