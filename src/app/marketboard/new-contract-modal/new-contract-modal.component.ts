import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  @Input() contract: Contract;

  typeInput: string;
  subjectInput: string;
  bodyInput: string;
  seekingLowestOfferInput: string;
  legalAgreementInput: string;

  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private contractService: ContractService) { }

  ngOnInit() {
    this.typeInput = this.contract.type;
    this.subjectInput = this.contract.subject;
    this.bodyInput = this.contract.body;
    this.seekingLowestOfferInput = this.contract.seekingLowestOffer.toString();
    this.legalAgreementInput = this.contract.legalAgreement;
  } 

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public createNewContract(newContract: Contract) {
    if (this.contract.id) {
      this.updateContract(this.contract, newContract);
    } else {
      newContract.contracteeId = this.user.id;
      this.addContract(newContract);
    }
  }

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


  private addContract(contract: Contract) {
    this.subscriptions.push(
      this.contractService.addContract(contract).subscribe(
        (response: Contract) => {
          this.presentToast('New contract created successfully');
          setTimeout(() => window.location.reload(), 2000);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.presentToast('Error creating new contract');
        }));
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private updateContract(existingContract: Contract, newContract: Contract) {
    existingContract.type = newContract.type;
    existingContract.subject = newContract.subject;
    existingContract.body = newContract.body;
    existingContract.seekingLowestOffer = newContract.seekingLowestOffer;
    existingContract.legalAgreement = newContract.legalAgreement;
    this.subscriptions.push(
      this.contractService.editContract(existingContract).subscribe(
        (response: Contract) => {
          this.presentToast('Contract updated successfully');
          setTimeout(() => window.location.reload(), 2000);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.presentToast('Error updating contract');
      }));
  }
}
