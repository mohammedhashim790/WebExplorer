import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {printer} from "../../app.component";

@Component({
  selector: 'app-sync-menu',
  templateUrl: './sync-menu.component.html',
  styleUrls: ['./sync-menu.component.css']
})
export class SyncMenuComponent implements OnInit {

  @Output() onSelectDrive:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  SelectedDrive(event: string) {
    printer(event);
    this.onSelectDrive.emit(event);
  }
}
