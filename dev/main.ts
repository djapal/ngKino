import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {NumbersService} from "./numbers.service";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(AppComponent, [HTTP_PROVIDERS, NumbersService]);
