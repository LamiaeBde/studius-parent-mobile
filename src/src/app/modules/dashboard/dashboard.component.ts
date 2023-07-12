import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCompoenent } from 'src/app/layouts/admin/admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  constructor(private admin: AdminCompoenent, private router:Router) { }

  ngOnInit() {
  }
  
}
