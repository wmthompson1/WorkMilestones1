import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { UserCreateComponent } from "./admin/manage-user/user-edit/user-create.component";
import { PageNotFoundComponent } from "./pagenotfound/page-not-found.component";
import { PSLandingComponent } from "./post-school/manage-post-school/ps-landing.component";
import { PSDistrictListComponent } from "./post-school/manage-post-school/manage-districts/ps-district-list.component";
import { PSSchoolsListComponent } from "./post-school/manage-post-school/manage-districts/ps-schools-list.component";
import { IepLandingComponent } from "./iep/iep-landing.component";
import { QuistLandingComponent } from "./quist/quist-landing.component";
import { HomeComponent } from "./home.component";
import { TSFFaqComponent } from "./faq/tsf-faq.component";
import { Indicator14DefinitionsComponent } from "./faq/indicator14-definitions.component";
import { PSQuestionsComponent } from "./post-school/manage-post-school/ps-questions.component";
import { PSStudentsListComponent } from "./post-school/manage-post-school/manage-districts/ps-students-list.component";
import { StateTargetsComponent } from "./admin/manage-state-target/manage_state_targets.component";
import { AddTargetComponent } from "./admin/manage-state-target/add-target/add-target.component";
import { EditTargetComponent } from "./admin/manage-state-target/edit-target/edit-target.component";
import { CreateTicketComponent } from "./help/create-ticket.component";
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
import { ManageSurveyFormEditComponent } from "./admin/manage-surveyFormEdit.component";
import { SurveyGridComponent } from "./admin/survey-grid.component";
import { SurveyDetailComponent } from "./surveys/manage-surveyDetail.component"	

const appRoutes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "create-user", component: UserCreateComponent },
    { path: "account", component: UserCreateComponent },
    { path: "home", component: HomeComponent },
    { path: "ps-landing", component: PSLandingComponent },
    { path: "ps-district-list/:agencyId/:schoolYear", component: PSDistrictListComponent },
    { path: "ps-schools-list/:districtId/:schoolYear/:districtName", component: PSSchoolsListComponent },
    { path: "iep-landing", component: IepLandingComponent },
    { path: "quist-landing", component: QuistLandingComponent },
    { path: "tsf-faq", component: TSFFaqComponent },
    { path: "indicator14-definitions", component: Indicator14DefinitionsComponent },
    { path: "ps-students-list/:schoolCode/:schoolYear/:ssid/:agencyId/:districtId/:districtName", component: PSStudentsListComponent },
    { path: "ps-questions", component: PSQuestionsComponent },
    { path: "manage_state_targets", component: StateTargetsComponent},
    { path: "add-target", component: AddTargetComponent },
    { path: "edit-target/:targetValue/:id/:schoolYear/:targetType/:targetName", component: EditTargetComponent },
    { path: "create-ticket", component: CreateTicketComponent },
    { path: "import-file", component: ImportFileComponent },
    { path: "display-import-errors/:id", component: DisplayImportErrorsComponent },
    { path: "import-row-detail/:id/:rowId", component: ImportRowDetailComponent },
    { path: "manage-agency-districts", component: ManageAgency },
    { path: "add-district", component: AddDistrictComponent },
    { path: "user-list", component: UserListComponent, resolve: { userList: UserListResolver } },
    { path: "reset-password", component: ResetPasswordComponent },
    { path: "email-reset-password", component: EmailPasswordResetComponent },
    { path: "edit-agency/:id/:agencyCode/:agencyName/:countyName/:isActive/:parentId", component: EditAgencyComponent },
    { path: "changepassword/:userId/:code", component: ConfirmPasswordComponent },
    { path: "confirmuser/:userId/:code", component: UserConfirmComponent, resolve: { success: UserConfirmResolver } },
    { path: "roles", component: RolesListComponent },
    { path: "add-role", component: AddRoleComponent },
    { path: "edit-role/:name/:id", component: EditRoleComponent },
    { path: 'survey-render', component: SurveyGridComponent },
    { path: 'surveyFormEdit/:id', component: ManageSurveyFormEditComponent },
    { path: 'surveyDetails/:id', component: SurveyDetailComponent },
    { path: 'surveyDetails', component: SurveyDetailComponent },
    { path: "**", component: PageNotFoundComponent }
];

export const AppRoutingProviders: any[] = [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
