﻿import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
//import { enableProdMode } from "@angular/core";
import {AppModule} from "./app.module";

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
    .then((success: any) => console.log("moo"))
    .catch((err: any) => console.error(err));

