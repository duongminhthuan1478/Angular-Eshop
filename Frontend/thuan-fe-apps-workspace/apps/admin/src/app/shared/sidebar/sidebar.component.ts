import { Component, OnInit } from '@angular/core';
import { AuthService } from '@thuan-fe-apps-workspace/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public _auth: AuthService) { }

  ngOnInit(): void {
  }

}
