import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CategoriesService, Category, ProductsService } from '@thuan-fe-apps-workspace/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  
  categories = [];
  imageDisplay: string | ArrayBuffer;

  form: FormGroup = null;
  isSubmit = false;
  isEditMode = false;
  productId: string = null;

  constructor(
    public messageService: MessageService,
    public location: Location,
    private fb: FormBuilder,
    private _categories: CategoriesService,
    private _products: ProductsService,
    private route: ActivatedRoute
  ) {
    this.initForm();
    this.getCategories();
  }
  
  get productControls() { return this.form.controls; }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params?.id;
    this.isEditMode = !!this.productId;
    this.patchDataEditMode();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if(file) {
      this.form.patchValue({image: file})

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  public onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) return;
    
    const formData = new FormData();
    Object.keys(this.productControls).map((key) => {
      formData.append(key, this.productControls[key].value);
    });

    if(this.isEditMode) {
      this.update(formData);
    } else {
      this.create(formData);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  } 

  private create(formData: FormData) {
    this._products.createProduct(formData).subscribe({
      next: (res) =>  {
        if(!res.success) {
          this.messageService.add({severity:'error', summary:'Failed', detail: res.message});
        } else {
          this.messageService.add({severity:'success', summary:'Success', detail: res.message});
          this.location.back();
        }
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail: err.message});
      }
    });
  }

  private update(formData: FormData) {
    this._products.updateProduct(formData, this.productId).subscribe({
      next: (res) =>  {
        if(!res.success) {
          this.messageService.add({severity:'error', summary:'Failed', detail: res.message});
        } else {
          this.messageService.add({severity:'success', summary:'Success', detail: res.message});
          this.location.back();
        }
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail: err.message});
      }
    });
  }

  private getCategories() {
    this._categories.getCategories().subscribe((res) => {
      if (res.success) {
        this.categories = res.data;
      }
    });
  }

  private patchDataEditMode() {
    if(this.isEditMode) {
      this._products.geProductById(this.productId).subscribe(res => {
        if(res?.data) {
          const data = res.data;
          data.category = data.category.id;
          this.form.patchValue(data);
          this.imageDisplay = data.image;
        } 
      });
    }
  }

}
