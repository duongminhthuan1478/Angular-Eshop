import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { UsersService, User } from '@thuan-fe-apps-workspace/users';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  passwordOptions = [{label: 'OFF', value: 'OFF'}, {label: 'ON', value: 'ON'}];
  countries = [];

  form: FormGroup = null;
  isSubmit = false;
  isEditMode = false;
  userId: string = null;

  constructor(
    public messageService: MessageService,
    public location: Location,
    private fb: FormBuilder,
    private _users: UsersService,
    private route: ActivatedRoute
  ) {
    this.getCountries();
  }
  
  get userFormControl() { return this.form.controls; }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params?.id;
    this.isEditMode = !!this.userId;
    this.initForm();
    this.updateStatusPasswordInput();
    this.patchDataEditMode();
  }

  public onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) return;
    
    const user: User = { };
    Object.keys(this.userFormControl).map((key) => {
      if(key === 'isUpdatePassword') {
        return;
      }
      user[key] = this.userFormControl[key].value;
    });
   
    if (this.userFormControl.isUpdatePassword.value === 'OFF' && this.isEditMode) {
      delete user.password
    }
   

    if(this.isEditMode) {
      this.update(user);
    } else {
      this.create(user);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      id: '',
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
      isUpdatePassword: this.isEditMode ? 'OFF' : 'ON'
    });
    this.userFormControl.isUpdatePassword.valueChanges.subscribe(val => {
      this.updateStatusPasswordInput();
    })
  } 

  private create(user: User) {
    this._users.createUser(user).subscribe({
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

  private update(user: User) {
    this._users.updateUser(user).subscribe({
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

  private getCountries() {
    this.countries = this._users.getCountries();
  }

  private patchDataEditMode() {
    if(this.isEditMode) {
      this._users.getUserById(this.userId).subscribe(res => {
        if(res?.data) {
          const data = res.data;
          this.form.patchValue(data);
        } 
      });
    }
  }

  private updateStatusPasswordInput() {
    const isUpdatePassword = this.userFormControl.isUpdatePassword.value;
    if(isUpdatePassword === 'OFF') {
      this.form.controls['password'].disable();
    } else {
      this.form.controls['password'].enable();
    }
  }
}
