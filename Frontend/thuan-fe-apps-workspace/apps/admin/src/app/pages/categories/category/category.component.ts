import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CategoriesService, Category } from '@thuan-fe-apps-workspace/products';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();

  form: FormGroup = null;
  isSubmit = false;
  isEditMode = false;
  categoryId: string = null;

  constructor(
    public messageService: MessageService,
    public location: Location,
    private fb: FormBuilder,
    private _categories: CategoriesService,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params?.id;
    this.isEditMode = !!this.categoryId;
    this.patchDataEditMode();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  get categoryControls() {
    return this.form.controls;
  }

  public onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) return;

    const category: Category = {
      id: this.categoryId,
      name: this.categoryControls.name.value,
      icon: this.categoryControls.icon.value,
      color: this.categoryControls.color.value,
    };

    if(this.isEditMode) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['fff']
    });
  }

  private patchDataEditMode() {
    if(this.isEditMode) {
      this._categories.getCategoryById(this.categoryId).pipe(takeUntil(this.destroySubscription$)).subscribe(category => {
        if(category?.data) {
          const data = category.data;
          this.form.patchValue({
            name: data.name,
            icon: data.icon,
            color: data.color
          });
        } 
      });
    }
  }

  private createCategory(category: Category) {
    this._categories.createCategory(category).pipe(takeUntil(this.destroySubscription$)).subscribe({
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

  private updateCategory(category: Category) {
    this._categories.updateCategory(category).pipe(takeUntil(this.destroySubscription$)).subscribe({
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
}
