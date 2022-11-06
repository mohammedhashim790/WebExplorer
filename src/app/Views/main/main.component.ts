import { Component, OnInit } from '@angular/core';
import {errorLogger, printer} from "../../app.component";
import {APIService} from "../../Bloc/Services/API/api.service";
import {Drives} from "../../Bloc/Services/Responses/Response";
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {Folder} from "../../Bloc/Wrappers/Folder";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showSyncMenu: boolean = false;

  showSyncProgress:boolean = false;


  drives!:Array<string> | undefined;

  private id!:string | null;
  public drive: string = "0";
  public currentFolder!: Folder;
  loading: boolean = false;
  notSynced: boolean = false;

  get Path(){
    this.currentFolder.Path.replace("//","/")
    return this.currentFolder.Path.split('/');
  }

  constructor(
    private api:APIService,
    private router:Router,
    private routerParams:ActivatedRoute
  ) {
    this.api.ListDrives().toPromise().then(async (res) => {
      if (res != undefined) {
        this.drives = res?.drives;
        // this.Init();
        this.Start();
      }
    });



  }

  Start(){
    this.drive = window.location.pathname.replace("/","");
    this.id = this.routerParams.snapshot.queryParamMap.get("id");
    if(this.id){
      printer("Reading by ID")
      this.ReadFromFolderById();
    }else{
      printer("Reading Local Drive "+ this.drive);
      this.ReadFromLocalDrive();
    }
  }

  Init(){

  }

  ngOnInit(): void {

  }

  private ReadFromFolderById() {
    if(this.id)
      this.api.ReadFromFolderById(this.id).toPromise().then((res)=>{
        printer("Res of "+ this.id);
        printer(res);
        this.currentFolder = res as Folder;
        printer(this.currentFolder);
      }).catch((err)=>{
        printer("Error");
        errorLogger(err);

      });
  }

  ReadFromLocalDrive() {
    let drive = this.drives![Number(this.drive)].toUpperCase();
    printer("From Drive " + drive);
    if(!drive.endsWith(":/")){
      drive = drive + ":/";
    }
    this.api.ReadFromFolderByName(drive).toPromise().then((res)=>{
      printer("Res of "+ drive);
      this.currentFolder = res as Folder;
      printer(this.currentFolder);

    }).catch((err)=>{
      printer("Error from Drive");
      errorLogger(err);
      this.notSynced = true;
      // this.SyncDatabase(drive);
    });
  }

  Sync(drive:string){
    this.SyncDatabase(drive);
  }

  private async SyncDatabase(drive:string) {

    let index = this.drives?.indexOf(drive);
    printer(drive);
    if(!drive.endsWith(":/")){
      drive = drive + ":/";
    }
    printer(drive);
    printer("SYnc");
    printer(index);

    this.showSyncProgress = true;
    this.showSyncMenu = false;
    try{
      let res = await this.api.SyncDB(drive).toPromise();

      this.currentFolder = res as Folder;
      this.showSyncProgress = false;
    }catch (e) {

    }finally {
      this.router.routeReuseStrategy.shouldReuseRoute = ()=>false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/"+index]);
    }

  }

  SyncAll() {
    let drive = this.drives![Number(this.drive)].toUpperCase();
    printer("From Drive " + drive);
    this.Sync(drive);
  }

  OnSelectDrive(drive: string) {
    printer(drive);
    printer(this.drives)
    let index = this.drives?.indexOf(drive);
    if(index!=-1){
      this.router.routeReuseStrategy.shouldReuseRoute = ()=>false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/"+index]);

      // this.api.ReadFromFolderByName(drive).toPromise().then((res)=>{
      //   printer("Res of "+ drive);
      //   this.currentFolder = res as Folder;
      //   printer(this.currentFolder);
      // }).catch((error)=>{
      //   errorLogger("No Data found. Syncing Data");
      //   // this.Sync(drive);
      // });
    }

  }
}
