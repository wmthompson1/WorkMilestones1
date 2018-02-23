import { Component } from "@angular/core";

@Component({
    selector: "home",
    template: '<body style="margin-top: 25px;"><h1>{{title}}</h1><tsf-footer></tsf-footer></body>',
    styles: []
})
export class HomeComponent {
    title = "Welcome to the Transition Systemic Framework!";
    header = "Home Page";
}
