import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { User } from 'src/app/model/user';
import { ContractService } from 'src/app/service/contract.service';
import { UserService } from 'src/app/service/user.service';
import { timeFromNow } from 'src/app/shared/shared.utils';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss'],
})
export class InquiriesComponent implements OnInit, OnDestroy {

  contracts: Contract[];
  usersMap: Map<number, User> = new Map();
  subscriptions: Subscription[] = [];

  constructor(
    private contractService: ContractService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.contractService.getContracts().subscribe((contracts: Contract[]) => {
        this.contracts = contracts;
        this.getContractsUser();
      })
     );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getUsername(contracteeId: number): string {
    return this.usersMap.get(contracteeId) ? this.usersMap.get(contracteeId).username : undefined;
  }

  public getUserProfileImage(contracteeId: number): string {
    return this.usersMap.get(contracteeId) ? this.usersMap.get(contracteeId).profileImageUrl : undefined;
  }

  public timeFromNow(time: Date) {
    return timeFromNow(time);
  }

  private getContractsUser() {
    this.contracts.forEach((contract: Contract) => {
      this.subscriptions.push(
        this.userService.findUserById(contract.contracteeId).subscribe((user: User) => {
          this.usersMap.set(contract.contracteeId, user);
        }));
    });
  }
}
