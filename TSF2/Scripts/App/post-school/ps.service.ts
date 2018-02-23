import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { DistrictSummary } from "./model/DistrictSummary";
import { StudentSummary } from "./model/StudentSummary";
import { Agency } from "./model/school";
import { SearchResult } from "./SearchResult";
import 'rxjs/add/operator/toPromise';
import { DistrictSchools } from "./model/DistrictSchools"; 

@Injectable()
export class PsService {
    constructor(public _http: Http, private router: Router) { this.baseUrl = window.location.origin; }

    baseUrl: string;
    getDistrictsSummary(agencyCode: number, schoolYear: string): Observable<DistrictSummary[]> {
        var fullUrl = this.baseUrl + '/api/postschool/getdistrictlist/' + agencyCode + '/' + schoolYear;

        return this._http.get(fullUrl)
            .map(res => res.json() as DistrictSummary[])
            .catch(this.handleError);
    }

    getSchools(): Observable<Agency[]> {
        var fullUrl = this.baseUrl + '/api/postschool/getSchools';

        return this._http.get(fullUrl)
            .map(res => res.json() as Agency[])
            .catch(this.handleError);
    }

    getSchoolsSummary(agencyCode: string, schoolYear: string, ssid: string, useName: string): Observable<StudentSummary[]> {
        var fullUrl = this.baseUrl + '/api/postschool/getSchoolSummary/' + agencyCode + '/' + schoolYear + '/' + ssid + '/' + useName;
        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(data => data.json());

    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    deleteRecord(subjectSurveyId: number, userAgencyId: number) {
        var fullUrl = this.baseUrl + '/api/postschool/deleterecord/' + subjectSurveyId + '/' + userAgencyId;
        return this._http.get(fullUrl)
            .catch(this.handleError);
    }

    doSSIDSearch(ssid: string, email: string, schoolYear: string, agencyId: number): Observable<SearchResult> {
        var fullUrl = this.baseUrl + '/api/postschool/searchssid/' + ssid + '/' + email + '/' + schoolYear + '/' + agencyId;

        var response = this._http.get(fullUrl)
            .catch(this.handleError)
                    
        return response;
    }

    getDistrictSchools(agencyCode: number, SChoolYear: string): Observable<DistrictSchools[]> {
        var fullUrl = this.baseUrl + '/api/postschool/getDistrictSchoolSummary/' + agencyCode + '/' + SChoolYear;
        return this._http.get(fullUrl)
            .map(res => res.json() as DistrictSchools[])
            .catch(this.handleError);
    }
}
