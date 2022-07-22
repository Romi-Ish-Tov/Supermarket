import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {

  @Input("currentItem") 
  public currentItem: any

  @Input("search")
  public search: string
  
  public product: any = [];
  constructor(public productsService:ProductsService) { }

  ngOnInit(): void {
    this.product = this.productsService.productsArray.find((product: Product) => 
    (product._id == this.currentItem.productId) ? product : null);
  }

}
