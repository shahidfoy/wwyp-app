import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Contract } from 'src/app/model/contract';
import { SubCategoryInterface } from 'src/app/model/interfaces/subcategoryinterface';
import { SubCategory } from 'src/app/model/sub-category';
import { User } from 'src/app/model/user';
import { CategoryService } from 'src/app/service/category.service';
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
  categories: Category[] = [];
  subcategories: SubCategoryInterface[] = [];

  changeCategory: BehaviorSubject<Category> = new BehaviorSubject(undefined);

  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private categoryService: CategoryService,
              private contractService: ContractService) { }

  ngOnInit() {
    this.typeInput = this.contract.type;
    this.subjectInput = this.contract.subject;
    this.bodyInput = this.contract.body;
    this.seekingLowestOfferInput = this.contract.seekingLowestOffer.toString();
    this.legalAgreementInput = this.contract.legalAgreement;
    this.getCategories();
  } 

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public changeSubCategory() {
    this.subcategories = [];
    let categoryName = this.typeInput;
    this.categories.forEach((category: Category) => {
      if (category.name === categoryName) {
        category.subCategories.forEach((sub: SubCategoryInterface) => {
          sub.isSelected = false;
          this.subcategories.push(sub);
        });
      }
    });
    this.subcategories.sort((sc1, sc2) => (sc1.name > sc2.name ? 1 : -1));
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

  public isSelected(subcategory: SubCategoryInterface) {
    this.subcategories.forEach((subcategory: SubCategoryInterface) => subcategory.isSelected = false);
    subcategory.isSelected = !subcategory.isSelected;
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

  private getCategories() {
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe((categories: Category[]) => {
        console.log(categories);
        this.categories = categories.sort((c1, c2) => (c1.name > c2.name ? 1 : -1));
      })
    );
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
