import { Component, OnInit } from '@angular/core';
import {APIService} from "../../Bloc/Services/API/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  constructor(
    private api:APIService,
    private router:Router
    ) {
    this.Start();
  }

  ngOnInit(): void {
  }

  private Start(){

  }

  range(){
    return new Array(10);
  }


}
