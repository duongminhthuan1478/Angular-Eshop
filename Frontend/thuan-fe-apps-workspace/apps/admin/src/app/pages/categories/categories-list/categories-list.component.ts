import { takeUntil, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@thuan-fe-apps-workspace/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  public categories: Category[] = [];

  constructor(
    public _message: MessageService,
    private _categories: CategoriesService,
    private _confirmation: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.getCategories();
  }
  
  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  public handleDeleteCategory(catId: string) {
    this._confirmation.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.deleteCategory(catId);
      }
    });
  }

  public handleUpdateCategory(catId: string) {
    // this.router.navigate(['categories/form', catId]);
    this.router.navigateByUrl(`categories/form/${catId}`);
  }

  private getCategories() {
    this._categories.getCategories().pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.categories = res.data;
      }
    });
  }

  private deleteCategory(catId: string) {
    this._categories.deleteCategory(catId).pipe(takeUntil(this.destroySubscription$)).subscribe({
      next: (res) => { 
        const success = res.success ? 'Success' : 'Error';
        this._message.add({severity: success.toLowerCase(), summary: success, detail: res.message});
        this.getCategories();
      },
      error: (err) => { this._message.add({severity:'error', summary:'Error', detail: err.message});}
    });
  }

}
