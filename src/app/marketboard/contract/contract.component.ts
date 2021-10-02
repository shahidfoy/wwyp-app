import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { Offer } from 'src/app/model/offer';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ContractService } from 'src/app/service/contract.service';
import { UserService } from 'src/app/service/user.service';

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
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private contractService: ContractService,
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

  private getContract(id: number): void {
    this.subscriptions.push(
      this.contractService.findContractById(id).subscribe((contract: Contract) => {
        this.contract = contract;
        this.contractUser = this.userService.findUserById(contract.contracteeId);
        this.offers = contract.offers;
        this.getOffersUserProfileImage();
      }));
  }

  private getOffersUserProfileImage() {
    this.offers.forEach((offer: Offer) => {
      this.subscriptions.push(
        this.userService.getProfileImageByUserId(offer.userId)
          .subscribe((userProfileImage: string) => {
            offer.userProfileImage = userProfileImage;
          }));
    });
  }
}
