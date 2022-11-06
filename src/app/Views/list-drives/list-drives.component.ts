import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {APIService} from "../../Bloc/Services/API/api.service";
import {printer} from "../../app.component";
import {Folder} from "../../Bloc/Wrappers/Folder";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-drives',
  templateUrl: './list-drives.component.html',
  styleUrls: ['./list-drives.component.css']
})
export class ListDrivesComponent implements OnInit {
  drives: Array<string> = [];


  @Output() public onSelectDrive = new EventEmitter<string>();

  constructor(private api:APIService,private router:Router) {
    this.api.ListDrives().toPromise().then((res)=>{
      if(res!=undefined)
          this.drives = res?.drives;
    });

  }

  ngOnInit(): void {
  }

  navigateTo(index:string) {
    this.onSelectDrive.emit(index)
  }
}
