import { Component } from "@angular/core";

@Component({
    selector: "indicator14-definitions",
    templateUrl: "app/faq/indicator14-definitions.component.html",
    styleUrls: ["app/faq/indicator14-definitions.component.css"]
})

export class Indicator14DefinitionsComponent {
    title: string = "Indicator 14 Definitions";

    doPrint(): void {
        window.print();
    }
}