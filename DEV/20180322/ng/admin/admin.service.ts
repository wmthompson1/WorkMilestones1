// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\admin.service.ts
import { Injectable } from "@angular/core";
//import { Http, Headers, Response, RequestOptions, RequestMethod} from "@angular/http";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import {Router} from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs/Rx";
// import { StateTarget } from "./model/StateTarget";
// import { Import } from "./model/import";
// import { ImportError } from "./model/ImportError";
// import { ImportRowDetail } from "./model/ImportRowDetail";
// import { agencySummary } from "./model/agencySummary";
// import { UserListItem } from "./model/UserListItem";
// import { GridDataResult } from "@progress/kendo-angular-grid";
// import { UpdateDistrict } from "./model/updateDistrict";
import { ISurvey } from './survey'
import { ISurveyNoDate } from './surveyNoDate'
import { ISurveyQuestionDetail } from '../surveys/model/surveyQuestionDetail'
import { ISurveyQuestion } from '../surveys/model/surveyQuestion'
import { ISurveyBase } from '../surveys/model/surveyBase'
import { ISurveyBaseNoDate } from '../surveys/model/surveyBaseNoDate'
//dev CORS William Thompson 2/9/2018
import { AppConfig } from '../../app.config';
import { agencySummary } from "./model/agencySummary";



@Injectable()
export class AdminService { //extends BehaviorSubject<GridDataResult> {
    constructor(public _http: HttpClient, private router: Router,  private config: AppConfig) {
        //super(null);
        //this.baseUrl = window.location.origin;        
        this.baseUrl = this.config.apiUrl
    }


     surveyQuestionDetails: ISurveyQuestionDetail[] = [];
    baseUrl: string;
    model: any = {};
        
    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }

    //surveys

    surveyGetAll() {
        return this._http.get(this.baseUrl +
            '/api/admin/surveys').catch(this.handleError);
    }

    surveyGetById(id: number) {
        return this._http.get(this.baseUrl +
            '/api/admin/surveys/' + id).catch(this.handleError);
    }

    surveyCreate(survey: ISurvey) {
        return this._http.post(this.baseUrl +
            '/api/admin/surveys', survey).catch(this.handleError);
    }

    surveyUpdate(survey: ISurvey): Observable<any> {
        return this._http.put(this.baseUrl
            + '/api/admin/surveys/' + survey.id, survey).catch(this.handleError);
    }

    surveyDelete(survey: ISurvey) {
        return this._http.delete(this.baseUrl
            + '/api/admin/surveys/' + survey.id).catch(this.handleError);  //, survey);
    } 

    // surveysNoDate

    surveyUpdateNoDate(survey: ISurvey): Observable<any> {
        return this._http.put(this.baseUrl
            + '/api/admin/surveys/noDate/' + survey.id, survey).catch(this.handleError);
    }


    // SurveyQuestionDetail

    surveyDetailGetAll() {
        return this._http.get(this.baseUrl +
            '/api/admin/surveyQuestionDetails').catch(this.handleError);
    }


    surveyDetailCreate(model: ISurvey): Observable<any> {
        console.log("calling surveyDetailCreate for ", model.id)
        var fullUrl = this.baseUrl + '/api/admin/surveyQuestionDetails';
        return this._http.post(fullUrl, model)
            .catch(this.handleError)            
    }

//     surveyDetailGetById(id: number): Observable<ISurveyQuestionDetail[]> {

    surveyDetailGetById(id: number): Observable<any[]> {
        console.log("calling surveyDetailGetById for ", id)
        return this._http.get(this.baseUrl +
            '/api/admin/surveyQuestionDetails/' + id).catch(this.handleError);
    }
    // SurveyQuestionDetail /


    // surveyQuestion
    getSurveyQuestion(id: number)  {
 
        console.log("calling getSurveyQuestion for ", id)
 
        return this._http.get(this.baseUrl +
            '/api/admin/surveyQuestions/' + id).catch(this.handleError);
    }

    getAgenciesCCTS(): Observable<agencySummary[]> {
        var fullUrl = this.baseUrl + '/api/admin/getAgenciesCCTS/';

        return this._http.get(fullUrl)            
            .catch(this.handleError);
    }

    // surveyBase
    getSurveyBase()  {

        console.log("calling getSurveyBase")
    
        return this._http.get(this.baseUrl +
            '/api/admin/surveyBase').catch(this.handleError);
    }

    getSurveyBaseById(id: number) : Observable<any[]>
    {
 
        console.log("calling getSurveyBaseById for ", id)
 
        return this._http.get(this.baseUrl +
            '/api/admin/surveyBase/' + id).catch(this.handleError);
    }

    surveyBaseCreate(surveyBaseNoDate: ISurveyBaseNoDate) 
    {
 
        console.log("calling SurveyBaseCreate for ", surveyBaseNoDate.id)
        var fullUrl = this.baseUrl + '/api/admin/surveyBase';
        return this._http.post(fullUrl, surveyBaseNoDate)
            .catch(this.handleError)  
    }

    // surveyTransaction (get new id)

    // surveyTransactionCreate(model: ISurvey): Observable<any> {
    //     console.log("calling surveyTransactionCreate ")
    //     var fullUrl = this.baseUrl + '/api/admin/surveyBase';
    //     return this._http.post(fullUrl, model)
    //         .catch(this.handleError)            
    // }


    // getStateTargets(): Observable<StateTarget[]> {
    //     var fullUrl = this.baseUrl + '/api/admin/getStateTargets';
    //     return this._http.get(fullUrl)
    //         .catch(this.handleError)
    //         .map(res => res.json() as StateTarget[]);
    // }

    // addTarget(model: StateTarget): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/addtarget';
        
    //     return this._http.post(fullUrl, model)
    //         .catch(this.handleError)
    //         .map(res => res.json());
    // }

    // editTarget(model: StateTarget): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/updatetarget';

    //     return this._http.post(fullUrl, model)
    //         .map(res => res.json());
    // }

    // getImportsList(): Observable<Import[]> {
    //     var fullUrl = this.baseUrl + '/api/admin/getimports';

    //     return this._http.get(fullUrl)
    //         .catch(this.handleError)
    //         .map(res => res.json() as Import[]);
    // }

    // uploadFile(payload: any): Observable<any[]> {
    //     var fullUrl = this.baseUrl + "/api/admin/importfile";
    //     let headers = new Headers();
    //     headers.delete("Content-Type");

    //     headers.append("Accept", "application/json");
    //     var options = new RequestOptions({
    //         headers: headers,
    //         url: fullUrl,
    //         method: RequestMethod.Post,
    //         body: JSON.stringify(payload)
    //     });

    //     return this._http.post(fullUrl, options)
    //         .map((res: Response) => {
    //             let data = res.json();
    //             return data;
    //         })
    //         .catch(this.handleError);
    // }

    // deleteImport(id: number): Observable<any> {
    //     var fullUrl = this.baseUrl + "/api/admin/deleteimport/" + id;

    //     return this._http.delete(fullUrl)
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }

    // getImportErrors(id: number): Observable<ImportError[]> {
    //     var fullUrl = this.baseUrl + "/api/admin/getImportErrors" + "/" + id;

    //     return this._http
    //         .get(fullUrl)
    //         .map(res => res.json() as ImportError[])
    //         .catch(this.handleError);
    // }

    // getImportRowDetails(id: number, rowId: number): Observable<ImportRowDetail> {
    //     var fullUrl = this.baseUrl + "/api/admin/GetImportRowDetail" + "/" + id + "/" + rowId;

    //     return this._http.get(fullUrl)
    //         .catch(this.handleError)
    //         .map(res => res.json() as ImportRowDetail);
    // }

    // getDistricts(): Observable<agencySummary[]> {
    //     var fullUrl = this.baseUrl + '/api/admin/getDistricts/';

    //     return this._http.get(fullUrl)
    //         .map(res => res.json() as agencySummary[])
    //         .catch(this.handleError);
    // }

    // getDistrictsCCTS(): Observable<agencySummary[]> {
    //     var fullUrl = this.baseUrl + '/api/admin/getDistrictsCCTS/';

    //     return this._http.get(fullUrl)
    //         .map(res => res.json() as agencySummary[])
    //         .catch(this.handleError);
    // }

    // addDistrict(model: agencySummary): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/addDistrict';

    //     return this._http.post(fullUrl, model)
    //         .catch(this.handleError)
    //         .map(res => res.json());
    // }

    // updateDistrict(model: UpdateDistrict): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/updateDistrict';

    //     return this._http.post(fullUrl, model)
    //         .map(res => res.json());
    // }

    // deleteDistrict(agencyId: number): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/deleteDistrict/' + agencyId;

    //     return this._http.delete(fullUrl)
    //         .map(res => res.json());
    // }

    // //query(state: any, id:number): void {
    // //    this.getUsers(id, state)
    // //        .subscribe(x => super.next(x));
    // //}

    // getUsers(agencyId: number): Observable<UserListItem[]>{
    //     var fullUrl = this.baseUrl + '/api/admin/getUsersList/' + agencyId;

    //     return this._http.get(fullUrl)
    //         .catch(this.handleError)
    //         .map(res => res.json());
    // }

    

    // save(data: any, isNew?: boolean) {

    // }

    // remove(userName: string): Observable<any> {
    //     var fullUrl = this.baseUrl + '/api/admin/deleteUser/' + encodeURIComponent(userName);
    //     return this._http.get(fullUrl)
    //         .catch(this.handleError)
    //         .map(res => res.json())
    // }

    

}