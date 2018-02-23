import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
//import { ActivatedRouteSnapshot } from "@angular/router";
//kendo
import { GridModule } from "@progress/kendo-angular-grid";
import "rxjs/Rx";
import { AppRouting } from "./app.routing";
import { AuthHttp } from "./auth.http";
import { AuthService } from "./auth.service";
import { PsService } from "./post-school/ps.service";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component"
import { UserCreateComponent } from "./admin/manage-user/user-edit/user-create.component";
import { PageNotFoundComponent } from "./pagenotfound/page-not-found.component";
import { HomeComponent } from "./home.component";
import { TsfFooterComponent } from "./tsf-footer.component";
import { TSFFaqComponent } from "./faq/tsf-faq.component";
import { Indicator14DefinitionsComponent } from "./faq/indicator14-definitions.component";
// PostSchool Components
import { PSLandingComponent } from "./post-school/manage-post-school/ps-landing.component";
import { PSDistrictListComponent } from "./post-school/manage-post-school/manage-districts/ps-district-list.component";
import { PSSchoolsListComponent } from "./post-school/manage-post-school/manage-districts/ps-schools-list.component";
import { PSStudentsListComponent } from "./post-school/manage-post-school/manage-districts/ps-students-list.component";
import { PSQuestionsComponent } from "./post-school/manage-post-school/ps-questions.component";
// IEP Review Components
import { IepLandingComponent } from "./iep/iep-landing.component";
import { IepDistrictListComponent } from "./iep/iep-district-list.component";
import { IepSchoolsListComponent } from "./iep/iep-schools-list.component";
// QuIST Components
import { QuistLandingComponent } from "./quist/quist-landing.component";
// Reports
import { ReportsService } from "./reports/reports.service";
// Admin
import { StateTargetsComponent } from "./admin/manage-state-target/manage_state_targets.component";
import { AdminService } from "./admin/admin.service";
import { AddTargetComponent } from "./admin/manage-state-target/add-target/add-target.component";
import { EditTargetComponent } from "./admin/manage-state-target/edit-target/edit-target.component";
import { ImportFileComponent } from "./admin/manage-import-file/import-file.component";
import { DisplayImportErrorsComponent } from "./admin/manage-import-file/display-import-errors/display-import-errors.component";
import { ImportRowDetailComponent } from "./admin/manage-import-file/display-import-errors/import-row-detail/import-row-detail.component";
import { ManageAgency } from "./admin/manage-agency/manage-agency-districts.component";
import { AddDistrictComponent } from "./admin/manage-agency/add-district/add-district.component";
import { UserListComponent } from "./admin/manage-user/user-list.component";
import { UserListResolver } from "./admin/user-list-resolver.service";
import { ResetPasswordComponent } from "./admin/manage-email-password/reset-password.component";
import { EmailPasswordResetComponent } from "./admin/manage-email-password/email-password.component";
import { EditAgencyComponent } from "./admin/manage-agency/edit-agency/edit-agency.component"; 
import { ConfirmPasswordComponent } from "./admin/manage-email-password/confirm-password.component";
import { UserConfirmComponent } from "./admin/manage-user/user-confirm/user-confirm.component";
import { UserConfirmResolver } from "./admin/manage-user/user-confirm/user-confirm.resolver.service";
import { RolesListComponent } from "./admin/manage-role/roles-list.component";
import { AddRoleComponent } from "./admin/manage-role/add-role.component";
import { EditRoleComponent } from "./admin/manage-role/edit-role.component";
// Help
import { TicketingService } from "./help/ticketing.service";
import { CreateTicketComponent } from "./help/create-ticket.component";
// Surveys
import { ManageSurveyFormEditComponent } from "./admin/manage-surveyFormEdit.component";
import { SurveyGridComponent } from "./admin/survey-grid.component";
import { PopupModule } from "@progress/kendo-angular-popup";
import { SurveyDetailComponent } from "./surveys/manage-surveyDetail.component"	

@NgModule(({
    // directives, components, and pipes
    declarations: [
        HomeComponent,
        AppComponent,
        LoginComponent,
        UserCreateComponent,
        PageNotFoundComponent,
        PSDistrictListComponent,
        PSLandingComponent,
        PSSchoolsListComponent,
        QuistLandingComponent,
        IepLandingComponent,
        IepDistrictListComponent,
        IepSchoolsListComponent,
        TsfFooterComponent,
        TSFFaqComponent,
        Indicator14DefinitionsComponent,
        PSQuestionsComponent,
        PSStudentsListComponent,
        StateTargetsComponent,
        AddTargetComponent,
        EditTargetComponent,
        CreateTicketComponent,
        ImportFileComponent,
        DisplayImportErrorsComponent,
        ImportRowDetailComponent,
        CreateTicketComponent,
        ManageAgency,
        AddDistrictComponent,
        UserListComponent,  
        ResetPasswordComponent,
        UserListComponent,   
        EditAgencyComponent,
        EmailPasswordResetComponent,
        ConfirmPasswordComponent,
        UserConfirmComponent,
        RolesListComponent,
        AddRoleComponent,
        EditRoleComponent,
		ManageSurveyFormEditComponent,
        SurveyGridComponent,
        SurveyDetailComponent
    ],
    // modules
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRouting,
        HttpModule,
        GridModule,
        BrowserAnimationsModule,
        HttpClientModule,
        PopupModule
    ],
    // providers
    providers: [
        AuthHttp,
        AuthService,
        PsService,
        ReportsService,
        AdminService,
        TicketingService,
        UserListResolver,
        UserConfirmResolver
    ],
    bootstrap: [
        AppComponent
    ]
}))


export class AppModule { }