import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {APIService} from "../../Bloc/Services/API/api.service";
import {printer} from "../../app.component";

@Component({
  selector: 'app-list-drives',
  templateUrl: './list-drives.component.html',
  styleUrls: ['./list-drives.component.css']
})
export class ListDrivesComponent implements OnInit {
  drives: Array<string> = [];

  @Output() public onSelectDrive = new EventEmitter<string>();

  constructor(private api:APIService) {
    this.api.ListDrives().toPromise().then((res)=>{
      if(res!=undefined)
          this.drives = res?.drives;
    });

  }

  ngOnInit(): void {
  }

}
