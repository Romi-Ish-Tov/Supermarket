import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input("currentProduct") 
  public currentProduct: any 
  public path = ''

  constructor(public adminService: AdminService) { }
  public product: any;
  
  ngOnInit(): void {
    this.path = window.location.pathname
  }
}
