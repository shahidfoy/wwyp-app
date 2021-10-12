import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { Offer } from 'src/app/model/offer';
import { User } from 'src/app/model/user';
import { OfferService } from 'src/app/service/offer.service';

@Component({
  selector: 'app-new-offer-modal',
  templateUrl: './new-offer-modal.component.html',
  styleUrls: ['./new-offer-modal.component.scss'],
})
export class NewOfferModalComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() contract: Contract;
  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController,
              private offerService: OfferService) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public createNewOffer(offer: Offer) {

    offer.contract = this.contract;
    offer.userId = this.user.id;
    offer.amountType = offer.amountType.toUpperCase();
    console.log(offer);

    this.subscriptions.push(
      this.offerService.addOffer(offer).subscribe(
        (response: Offer) => {
          console.log('new offer added successfully');
          window.location.reload();
          // TODO:: NOTIFY USER OF SUCCESS
        },
        (errorResponse: HttpErrorResponse) => {
          // TODO:: NOTIFY USER OF ERROR
          console.log(errorResponse);
        }));
  }

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
