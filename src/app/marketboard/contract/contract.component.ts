import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { OfferInterface } from 'src/app/model/interfaces/offer.interface';
import { Offer } from 'src/app/model/offer';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ContractService } from 'src/app/service/contract.service';
import { OfferService } from 'src/app/service/offer.service';
import { UserService } from 'src/app/service/user.service';
import { timeFromNow } from 'src/app/shared/shared.utils';
import { NewContractModalComponent } from '../new-contract-modal/new-contract-modal.component';
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
  totalOffers: number = 0;
  subscriptions: Subscription[] = [];

  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private contractService: ContractService,
    private offerService: OfferService,
    private router: Router,
    private toastController: ToastController,
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

  public async editContract(contract: Contract): Promise<void> {
    const modal = await this.modalController.create({
      component: NewContractModalComponent,
      componentProps: {
        'user': this.user,
        'contract': contract
      }
    });
    return await modal.present();
  }

  public deleteContract(id: number) {
    this.subscriptions.push(
      this.contractService.deleteContract(id).subscribe(
        (response: CustomHttpResponse) => {
          this.presentToast('Your contract was deleted.');
          this.router.navigateByUrl("/marketboard/profile");
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.presentToast('Error deleting contract');
        }));
  }

  public deleteOffer(id: number) {
    this.subscriptions.push(
      this.offerService.deleteOffer(id).subscribe(
        (response: CustomHttpResponse) => {
          this.presentToast('Your offer was deleted.');
          setTimeout(() => window.location.reload(), 1000);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.presentToast('Error deleting offer');
        }));
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
    
    this.subscriptions.push(
      this.offerService.countOfferByContractId(id).subscribe((total: number) => {
        this.totalOffers = total;
      }));
  }

  private getOffers(contractId: number) {
    if (this.contract.seekingLowestOffer) {
      this.subscriptions.push(
        this.offerService.findOfferByContractIdOrderByAmountAsc(contractId, 0).subscribe((offers: Offer[]) => {
          this.offers = offers;
          this.getOffersUser();
        }));
    } else {
      this.subscriptions.push(
        this.offerService.findOfferByContractId(contractId, 0).subscribe((offers: Offer[]) => {
          console.log(offers);
          this.offers = offers;
          this.getOffersUser();
        }));
    }
  }

  private getOffersUser() {
    this.offers.forEach((offer: OfferInterface) => {
      this.subscriptions.push(
        this.userService.findUserById(offer.userId).subscribe((user: User) => {
          offer.username = user.username;
          offer.userProfileImage = user.profileImageUrl;
        }));
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 1000
    });
    toast.present();
  }
}
