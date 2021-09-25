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



@NgModule({
  declarations: [
    MarketboardComponent,
    ChatComponent,
    EditProfileModalComponent,
    InquiriesComponent,
    NewContractModalComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketboardRoutingModule,
  ]
})
export class MarketboardModule { }
