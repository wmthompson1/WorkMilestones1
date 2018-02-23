import { Injectable } from "@angular/core";
import { Http, Response, ResponseContentType } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ReportsService {
    constructor(public _http: Http, private router: Router) { this.baseUrl = window.location.origin; }

    baseUrl: string;

    getPostSchoolContactReport(agencyId: string, leaverYear: string, agencyName: string): Observable<any> {

        var fullUrl = this.baseUrl + '/api/reports/getcontactratedata/' + agencyId + '/' + leaverYear + '/' + agencyName;

        return Observable.create(observer =>
        {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', fullUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'blob';

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        var blob = new Blob([xhr.response], { type: contentType });
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            xhr.send();
        });
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}