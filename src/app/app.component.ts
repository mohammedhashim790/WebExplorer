import { Component } from '@angular/core';
import {APIService} from "./Bloc/Services/API/api.service";
import {Router} from "@angular/router";


export var printer = console.log;

export var errorLogger = console.error;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebExplorer';

  constructor(private api:APIService,private router:Router) {

    this.router.navigate(["/0"]);
  }

}
