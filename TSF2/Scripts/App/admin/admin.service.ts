import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, RequestMethod} from "@angular/http";
import {Router} from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { StateTarget } from "./model/StateTarget";
import { Import } from "./model/import";
import { ImportError } from "./model/ImportError";
import { ImportRowDetail } from "./model/ImportRowDetail";
import { agencySummary } from "./model/agencySummary";
import { UserListItem } from "./model/UserListItem";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { UpdateDistrict } from "./model/updateDistrict";
import { ISurvey } from './survey'
import { ISurveyQuestionDetail } from '../surveys/model/surveyQuestionDetail'

@Injectable()
export class AdminService { //extends BehaviorSubject<GridDataResult> {
    constructor(public _http: Http, private router: Router) {
        //super(null);
        this.baseUrl = window.location.origin;        
    }

    baseUrl: string;
        
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    getStateTargets(): Observable<StateTarget[]> {
        var fullUrl = this.baseUrl + '/api/admin/getStateTargets';
        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json() as StateTarget[]);
    }

    addTarget(model: StateTarget): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/addtarget';
        
        return this._http.post(fullUrl, model)
            .catch(this.handleError)
            .map(res => res.json());
    }

    editTarget(model: StateTarget): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/updatetarget';

        return this._http.post(fullUrl, model)
            .map(res => res.json());
    }

    getImportsList(): Observable<Import[]> {
        var fullUrl = this.baseUrl + '/api/admin/getimports';

        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json() as Import[]);
    }

    uploadFile(payload: any): Observable<any[]> {
        var fullUrl = this.baseUrl + "/api/admin/importfile";
        let headers = new Headers();
        headers.delete("Content-Type");

        headers.append("Accept", "application/json");
        var options = new RequestOptions({
            headers: headers,
            url: fullUrl,
            method: RequestMethod.Post,
            body: JSON.stringify(payload)
        });

        return this._http.post(fullUrl, options)
            .map((res: Response) => {
                let data = res.json();
                return data;
            })
            .catch(this.handleError);
    }

    deleteImport(id: number): Observable<any> {
        var fullUrl = this.baseUrl + "/api/admin/deleteimport/" + id;

        return this._http.delete(fullUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getImportErrors(id: number): Observable<ImportError[]> {
        var fullUrl = this.baseUrl + "/api/admin/getImportErrors" + "/" + id;

        return this._http
            .get(fullUrl)
            .map(res => res.json() as ImportError[])
            .catch(this.handleError);
    }

    getImportRowDetails(id: number, rowId: number): Observable<ImportRowDetail> {
        var fullUrl = this.baseUrl + "/api/admin/GetImportRowDetail" + "/" + id + "/" + rowId;

        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json() as ImportRowDetail);
    }

    getDistricts(): Observable<agencySummary[]> {
        var fullUrl = this.baseUrl + '/api/admin/getDistricts/';

        return this._http.get(fullUrl)
            .map(res => res.json() as agencySummary[])
            .catch(this.handleError);
    }

    getAgenciesCCTS(): Observable<agencySummary[]> {
        var fullUrl = this.baseUrl + '/api/admin/getAgenciesCCTS/';

        return this._http.get(fullUrl)
            .map(res => res.json() as agencySummary[])
            .catch(this.handleError);
    }

    addDistrict(model: agencySummary): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/addDistrict';

        return this._http.post(fullUrl, model)
            .catch(this.handleError)
            .map(res => res.json());
    }

    updateDistrict(model: UpdateDistrict): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/updateDistrict';

        return this._http.post(fullUrl, model)
            .map(res => res.json());
    }

    deleteDistrict(agencyId: number): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/deleteDistrict/' + agencyId;

        return this._http.delete(fullUrl)
            .map(res => res.json());
    }

    //query(state: any, id:number): void {
    //    this.getUsers(id, state)
    //        .subscribe(x => super.next(x));
    //}

    getUsers(agencyId: number): Observable<UserListItem[]>{
        var fullUrl = this.baseUrl + '/api/admin/getUsersList/' + agencyId;

        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json());
    }

    

    save(data: any, isNew?: boolean) {

    }

    remove(userName: string): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/deleteUser/' + encodeURIComponent(userName);
        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json())
    }

    //Surveys William Thompson 2/5/18


    surveyGetAll() {
        return this._http.get(this.baseUrl +
            '/api/admin/surveys').map((response: Response) => response.json());
    }

    surveyGetById(id: number) {
        return this._http.get(this.baseUrl +
            '/api/admin/surveys/' + id).map((response: Response) => response.json());
    }

    surveyCreate(survey: ISurvey) {
        return this._http.post(this.baseUrl +
            '/api/admin/surveys', survey);
    }

    surveyUpdate(survey: ISurvey) {
        return this._http.put(this.baseUrl
            + '/api/admin/surveys/' + survey.id, survey);
    }

    surveyDelete(survey: ISurvey) {
        return this._http.delete(this.baseUrl
            + '/api/admin/surveys/' + survey.id);  //, survey);
    } 

    // SurveyQuestionDetail

    //surveyDetail
    surveyDetailGetAll() {
        return this._http.get(this.baseUrl +
            '/api/admin/surveyQuestionDetails').map((response: Response) => response.json());
    }


    surveyDetailCreate(model: ISurvey): Observable<any> {
        var fullUrl = this.baseUrl + '/api/admin/surveyQuestionDetails';

        return this._http.post(fullUrl, model)
            .catch(this.handleError)
            .map(res => res.json());
    }


    surveyDetailGetById(id: number) {
        console.log("calling surveyDetailGetById for ", id)
        return this._http.get(this.baseUrl +
            //return this.http.get(this.config.apiUrl +
            '/api/admin/surveyQuestionDetails/' + id).map((response: Response) => response.json());
    }

}