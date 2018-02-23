import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PsService } from "../ps.service";
import { AuthService } from "../../auth.service";
import { Agency } from "../model/school";

@Component({
    selector: "ps-landing",
    templateUrl: "app/post-school/manage-post-school/ps-landing.component.html",
    styleUrls: ["app/post-school/manage-post-school/ps-landing.component.css"],
    providers: [PsService, AuthService],
    encapsulation: ViewEncapsulation.None
})
export class PSLandingComponent implements OnInit {
    schoolYear: string;
    adminAgencyId: number = 90;
    text: string = "Leaver Year";
    title: string = "Post-School Survey Home";
    schoolCode: string;
    schoolName: string = "School Name";
    schools: Array<Agency> = [] as Array<Agency>;

    constructor(private route: ActivatedRoute, private router: Router, private psService: PsService, private authService: AuthService) {
        if (!this.authService.isLoggedIn()){
            this.router.navigate(["/login"]);
        }
    }

    ngOnInit() {
        this.psService
            .getSchools()
            .map(result => this.schools = result);
    }

    schoolYears: Array<string> = ["2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19", "2019-20"];
    
    setSchoolYear(year: string) {
        this.schoolYear = year;
        this.text = year;
    }

    setSchool(school: any) {
        this.schoolName = school.agencyName;
        this.schoolCode = school.id;
    }
}