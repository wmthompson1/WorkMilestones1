import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TicketingService } from "../help/ticketing.service";

@Component({
    selector: "create-ticket",
    templateUrl: './app/help/create-ticket.component.html',
    styleUrls: ['./app/help/create-ticket.component.css'],
    providers: [TicketingService]
})

export class CreateTicketComponent {

    title: string = "Leave Feedback";

    public description: string = "";
    public location: string = "";
    public browser: string = "";
    public device: string = "";
    public email: string = "";

    public devices: Device[] = [
        { "name": "Smartphone", "value": "Smartphone" },
        { "name": "Tablet", "value": "Tablet" },
        { "name": "Laptop", "value": "Laptop" },
        { "name": "Desktop", "value": "Desktop" },
    ];
    public browsers: Browser[] = [
        { "name": "Chrome", "value": "Chrome" },
        { "name": "Safari", "value": "Safari" },
        { "name": "Edge", "value": "Edge" },
        { "name": "Firefox", "value": "Firefox" },
        { "name": "Other", "value": "Other" }
    ];

    constructor(private ticketingService: TicketingService, private router: Router) { this.email = "ccts@seattleu.edu;"}

    createTicket(data) {

        var meta: string = "";
        meta += "Location: " + this.location + "<br/>";
        meta += "Device: " + this.device + "<br/>";
        meta += "Browser: " + this.browser + "<br/>";
        meta += "<br/>";

        data = {
            description: meta + this.description,
            subject: "Transition Systemic Framwork",
            email: this.email,
            priority: 1,
            status: 2
        }
        this.ticketingService.createTicket(data);
        window.alert("Your ticket has been submitted. Thank you for your feedback!");
        window.history.back();

    }

    cancel() {
        this.router.navigate(['/home']);
    }
}

class Device {
    name: string;
    value: string;
}

class Browser {
    name: string;
    value: string;
}
