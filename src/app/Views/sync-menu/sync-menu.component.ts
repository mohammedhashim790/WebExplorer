import { Component, OnInit } from '@angular/core';
import {printer} from "../../app.component";

@Component({
  selector: 'app-sync-menu',
  templateUrl: './sync-menu.component.html',
  styleUrls: ['./sync-menu.component.css']
})
export class SyncMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  SelectedDrive(event: string) {
    printer(event);
  }
}
