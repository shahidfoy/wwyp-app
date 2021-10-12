import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { Offer } from 'src/app/model/offer';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ContractService } from 'src/app/service/contract.service';
import { OfferService } from 'src/app/service/offer.service';
import { UserService } from 'src/app/service/user.service';
import { timeFromNow } from 'src/app/shared/shared.utils';
import { NewOfferModalComponent } from '../new-offer-modal/new-offer-modal.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit, OnDestroy {

  user: User;
  contractUser: Observable<User>;
  contract: Contract = new Contract();
  offers: Offer[];
  subscriptions: Subscription[] = [];

  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private contractService: ContractService,
    private offerService: OfferService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id: number = params['id'];
        this.getContract(id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public async makeNewOffer(): Promise<void> {
    const modal = await this.modalController.create({
      component: NewOfferModalComponent,
      componentProps: {
        'user': this.user,
        'contract': this.contract
      }
    });
    return await modal.present();
  }

  public timeFromNow(time: Date) {
    return timeFromNow(time);
  }

  private getContract(id: number): void {
    this.subscriptions.push(
      this.contractService.findContractById(id).subscribe((contract: Contract) => {
        this.contract = contract;
        this.contractUser = this.userService.findUserById(contract.contracteeId);
        this.getOffers(this.contract.id);
      }));
  }

  private getOffers(contractId: number) {
    this.subscriptions.push(
      this.offerService.findOfferByContractId(contractId).subscribe((offers: Offer[]) => {
        this.offers = offers;
        this.getOffersUser();
      }));
  }

  private getOffersUser() {
    this.offers.forEach((offer: Offer) => {
      this.subscriptions.push(
        this.userService.findUserById(offer.userId).subscribe((user: User) => {
          offer.username = user.username;
          offer.userProfileImage = user.profileImageUrl;
        }));
    });
  }
}
