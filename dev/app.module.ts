import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {KinoNumber} from "./kinonumber";
import {HttpModule} from "@angular/http";
import {NumbersService} from "./numbers.service";

@NgModule({
    imports:      [ BrowserModule, HttpModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        NumbersService
    ],
})
export class AppModule { }