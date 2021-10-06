import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-offer-modal',
  templateUrl: './new-offer-modal.component.html',
  styleUrls: ['./new-offer-modal.component.scss'],
})
export class NewOfferModalComponent implements OnInit {

  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
