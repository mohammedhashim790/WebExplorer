import { Component } from '@angular/core';
import {APIService} from "./Bloc/Services/API/api.service";
import {Router} from "@angular/router";
import {Folder} from "./Bloc/Wrappers/Folder";


export var printer = console.log;

export var errorLogger = console.error;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebExplorer';
  // showSyncProgress: boolean = false;

  constructor(private api:APIService,private router:Router) {
    this.Init();
  }

  async Init(){
    await this.api.IsEmpty().toPromise().then((res)=>{
      printer("Response");
      printer(res);
      // this.showSyncProgress = true;
      // this.SyncAllDatabase();
    }).catch((error)=>{
      errorLogger("error");
      errorLogger(error);
      this.router.navigate(["/0"]);
    });
  }


  private async SyncAllDatabase() {
    let drives = (await this.api.ListDrives().toPromise())?.drives;
    printer(await this.api.ListDrives().toPromise());
    for(let i = 0;i<drives!.length;i++){
      // let res  = await this.api.SyncDB(drive).toPromise();
      printer(drives![i]);
    }

    // this.router.navigate(["/0"]).then((res)=>{
    //   window.location.reload()
    // });
  }

}
