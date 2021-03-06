import { Subject, takeUntil } from 'rxjs';
import { Product, ProductsService } from '@thuan-fe-apps-workspace/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  public products: Product[] = [];

  constructor(
    public _message: MessageService,
    private _products: ProductsService,
    private _confirmation: ConfirmationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  handleUpdate(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }

  handleDelete(id: string) {
    this._confirmation.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.deleteProduct(id);
      }
    });
  }

  private getProducts() {
    this._products.getProducts().pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.products = res.data;
      }
    });
  }

  private deleteProduct(id: string) {
    this._products.deleteProduct(id).pipe(takeUntil(this.destroySubscription$)).subscribe({
      next: (res) => { 
        const success = res.success ? 'Success' : 'Error';
        this._message.add({severity: success.toLowerCase(), summary: success, detail: res.message});
        this.getProducts();
      },
      error: (err) => { this._message.add({severity:'error', summary:'Error', detail: err.message});}
    });
  }
}
