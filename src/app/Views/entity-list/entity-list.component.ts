import {Component, Input, OnInit} from '@angular/core';
import {APIService} from "../../Bloc/Services/API/api.service";
import {Router} from "@angular/router";
import {Folder} from "../../Bloc/Wrappers/Folder";
import {printer} from "../../app.component";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  @Input() folders!:Folder;

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

  navigateTo(folder:Folder){
    let current = window.location.pathname;

    printer(folder)
    printer(current);

    this.router.routeReuseStrategy.shouldReuseRoute = ()=>false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([current],{queryParams:{id:folder.Id}});

  }


}
