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

  get Path(){
    return this.currentFolder.Path.split('/');
  }

  constructor(
    private api:APIService,
    private router:Router,
    private routerParams:ActivatedRoute
  ) {
    this.api.ListDrives().toPromise().then((res)=>{
      if(res!=undefined) {
        this.drives = res?.drives;
        this.drives = this.drives?.map((value)=> value+"://")
        this.Init();
        // this.SyncDatabase();
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
    this.api.IsEmpty().toPromise().then((res)=>{
      printer("Response");
      printer(res);
      this.showSyncProgress = true;
      this.SyncDatabase();
    }).catch((error)=>{
      errorLogger("error");
      errorLogger(error);
      this.showSyncProgress = false;
      this.Start();
    });
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

  private ReadFromLocalDrive() {
    let drive = this.drives![Number(this.drive)];
    this.api.ReadFromFolderByName(drive).toPromise().then((res)=>{
      printer("Res of "+ drive);
      this.currentFolder = res as Folder;
      printer(this.currentFolder);

    }).catch((err)=>{
      printer("Error from Drive");
      errorLogger(err);
    });
  }

  private async SyncDatabase() {

    let res ;
    // res = await this.api.SyncDB(this.drives![0]).toPromise();
    //
    // printer("Res  + " + this.drives![0]);
    // printer(res);
    res = await this.api.SyncDB(this.drives![1]).toPromise();
    printer("Res  + " + this.drives![1]);
    printer(res);
    this.currentFolder = res as Folder;
    this.showSyncProgress = false;

  }
}
