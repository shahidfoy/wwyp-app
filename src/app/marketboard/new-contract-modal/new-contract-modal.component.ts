import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { User } from 'src/app/model/user';
import { ContractService } from 'src/app/service/contract.service';

@Component({
  selector: 'app-new-contract-modal',
  templateUrl: './new-contract-modal.component.html',
  styleUrls: ['./new-contract-modal.component.scss'],
})
export class NewContractModalComponent implements OnInit, OnDestroy {

  @Input() user: User;
  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController,
              private contractService: ContractService) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public createNewContract(contract: Contract) {
    console.log('new contact', contract);
    contract.contracteeId = this.user.id;
    
    this.subscriptions.push(
      this.contractService.addContract(contract).subscribe(
        (response: Contract) => {
          console.log('new contract added successfully');
          window.location.reload();
          // TODO:: NOTIFY USER OF SUCCESS
        },
        (errorResponse: HttpErrorResponse) => {
          // TODO:: NOTIFY USER OF ERROR
          console.log(errorResponse);
        }
      )
    );
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
