import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Views/main/main.component';
import { ListDrivesComponent } from './Views/list-drives/list-drives.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { SyncMenuComponent } from './Views/sync-menu/sync-menu.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { EntityListComponent } from './Views/entity-list/entity-list.component';
import { FolderComponent } from './Views/Components/folder/folder.component';
import { FileComponent } from './Views/Components/file/file.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ShortifyPipe } from './Bloc/Pipes/Shortify/shortify.pipe';
import {AppResource} from "./Bloc/Wrappers/AppResource";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListDrivesComponent,
    SyncMenuComponent,
    EntityListComponent,
    FolderComponent,
    FileComponent,
    ShortifyPipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule
    ],
  providers: [AppResource],

  bootstrap: [AppComponent]
})
export class AppModule { }
