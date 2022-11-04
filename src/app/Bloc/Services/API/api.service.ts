import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Drives} from "../Responses/Response";
import {Observable} from "rxjs";
import {Folder} from "../../Wrappers/Folder";



@Injectable({
  providedIn: 'root'
})
export class APIService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept':'*',
      'Content-Type':  'application/json',
      'Authorization':  '*'
    })};

  private header = new HttpHeaders({
    'Accept':'*',
    'Content-Type':  'application/json',
    'Authorization':  '*',
  });
  constructor(
    private httpClient:HttpClient
  ) { }


  ListDrives():Observable<Drives>{
    return this.httpClient.get<Drives>(
      environment.apiUrl+'/List',
      this.httpOptions
    );
  }

  IsEmpty():Observable<boolean>{
    return this.httpClient.get<boolean>(
      environment.apiUrl+'/IsEmpty',
      this.httpOptions
    );
  }


  ReadFromFolderById(id: string):Observable<any> {
    return this.httpClient.put<any>(
      environment.apiUrl + "/ListFrom",
      {
        parentId:id
      },
      this.httpOptions
    );
  }

  ReadFromFolderByName(drive: string) {
    return this.httpClient.put<any>(
      environment.apiUrl + "/ListFrom",
      {
        parent:drive
      },
      this.httpOptions
    );
  }

  SyncDB(drive:string){
    return this.httpClient.post<any>(
      environment.apiUrl + "/Update",
      {
        parent:drive
      },
      this.httpOptions
    );
  }

}
