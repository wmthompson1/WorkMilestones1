import { Component, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentSummary } from "../../model/StudentSummary";
import { PsService } from "../../ps.service";
import { AuthService } from "../../../auth.service";

declare var DevExpress: any;

@Component({
    //changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "ps-students-list",
    templateUrl: "app/post-school/manage-post-school/manage-districts/ps-students-list.component.html",
    styleUrls: ["app/post-school/manage-post-school/manage-districts/ps-students-list.component.css"],
    providers: [PsService, AuthService],
    encapsulation: ViewEncapsulation.None
})

export class PSStudentsListComponent {
    agencyId: string;
    agencyName: string = '';
    schoolYear: string;
    schoolCode: string;
    isLocked: boolean;
    ssid: string;
    email: string;
    districtId: number;
    districtName: string; 
    adminAgencyId = 90; 
    
    students: Array<StudentSummary> = [] as Array<StudentSummary>;

    constructor(private route: ActivatedRoute, private psService: PsService, private router: Router, private authService: AuthService) {
        this.schoolYear = this.route.snapshot.params['schoolYear'];
        this.schoolCode = this.route.snapshot.params['schoolCode'];
        this.ssid = this.route.snapshot.params['ssid'];
        this.email = this.route.snapshot.params['userName'];
        this.agencyId = this.route.snapshot.params['agencyId'];
        this.districtId = this.route.snapshot.params['districtId'];
        this.districtName = this.route.snapshot.params['districtName'];

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }

        this.getData();
    }

    getData() {
        this.psService
            .getSchoolsSummary(this.schoolCode, this.schoolYear, this.ssid, this.email)
            .subscribe(result => {
            this.students = result;
                if (this.students.length > 0 && this.students[0].Building) {
                    this.agencyName = this.students[0].Building;
                }
            });
    }

    changeLockedStatus() {
        this.isLocked = !this.isLocked;
    }

    getName(studentName: string, schoolName: string): string {
        this.agencyName = schoolName;
        return studentName;
    }

    deleteRecord(subjectSurveyId: number) {
        if (confirm("Are you sure you want to delete this record?")) {
            this.psService
                .deleteRecord(subjectSurveyId, +this.schoolCode)
                .subscribe(result => window.alert("Delete succeeded."), error => window.alert("Delete failed."));

            window.location.reload(true);
        }
    }
}
