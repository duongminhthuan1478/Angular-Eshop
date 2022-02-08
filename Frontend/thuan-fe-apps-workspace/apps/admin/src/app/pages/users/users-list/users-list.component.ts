import { UsersService, User } from '@thuan-fe-apps-workspace/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];

  constructor(
    public _message: MessageService,
    public _users: UsersService,
    private _confirmation: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.getUsers();
  }

  public handleDelete(catId: string) {
    this._confirmation.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.delete(catId);
      }
    });
  }

  public handleUpdate(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private getUsers() {
    this._users.getUsers().subscribe((res) => {
      if (res.success) {
        this.users = res.data;
      }
    });
  }

  private delete(catId: string) {
    this._users.deleteUser(catId).subscribe({
      next: (res) => { 
        const success = res.success ? 'Success' : 'Error';
        this._message.add({severity: success.toLowerCase(), summary: success, detail: res.message});
        this.getUsers();
      },
      error: (err) => { this._message.add({severity:'error', summary:'Error', detail: err.message});}
    });
  }

}
