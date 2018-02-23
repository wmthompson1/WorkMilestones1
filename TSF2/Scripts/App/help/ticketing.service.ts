import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TicketingService {

    apiKey = "civpnyoggpybNqZyja";
    ticketUrl: string = "https://cctstsf.freshdesk.com/api/v2/tickets";

    constructor(private _http: Http) { }

    createTicket(data) {

        let headers = new Headers({
            'Authorization': 'Basic ' + btoa(this.apiKey),
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        this._http
            .post(this.ticketUrl, data, options)
            .map((res: Response) => res.json())
            .subscribe();
    }

}