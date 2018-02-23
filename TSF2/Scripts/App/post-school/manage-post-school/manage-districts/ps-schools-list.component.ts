import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router"; 
import { PsService } from "../../ps.service";
import { DistrictSchools } from "../../model/DistrictSchools";
import { AuthService } from "../../../auth.service";

@Component({
    selector: "ps-schools-list",
    templateUrl: "app/post-school/manage-post-school/manage-districts/ps-schools-list.component.html",
    styleUrls: ["app/post-school/manage-post-school/manage-districts/ps-schools-list.component.css"],
    providers: [PsService, AuthService],
    encapsulation: ViewEncapsulation.None
})
export class PSSchoolsListComponent implements OnInit {

    districts: Array<DistrictSchools> = [] as Array<DistrictSchools>;
    AdminAgencyId = 90; 
    districtName: string; 
    leaverYear: string;
    progressValue: string;
    districtId: number; 

    constructor(private route: ActivatedRoute, private psService: PsService, private authService: AuthService, private router: Router) {
        
        this.leaverYear = this.route.snapshot.params['schoolYear'];
        this.districtName = this.route.snapshot.params['districtName']
        this.districtId = this.route.snapshot.params['districtId']

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }

    ngOnInit() {

        this.psService
            .getDistrictSchools(this.districtId, this.leaverYear)
            .subscribe(result => this.districts = result);
    } 

    getPercent(total: number): number {
        var newTotal = (total * 100).toFixed(2);
        return +newTotal;
    }

    getProgressValue(progress: number): number {
        var progressString = (progress).toFixed(0);
        return +progressString;
    }

    getMyStyles(progress: number, totalCount: number) {
        this.progressValue = (progress).toFixed(0);
        var myStyles = {};
        if ((this.progressValue === "100") && (totalCount === 0)) {
            myStyles = {
                "width.%": 100,
                "background": "lightblue",
                "float": "left"
            }
        } else if (this.progressValue === "100") {
            myStyles = {
                "width.%": +this.progressValue,
                "background": "lightgreen",
                "float": "left"
            }
        } else if (totalCount > 0 && progress !== 0) {
            myStyles = {
                "width.%": +this.progressValue,
                "background": "orange",
                "float": "left"
            }
        } else if (totalCount === 0) {
            myStyles = {
                "width.%": 100,
                "background": "lightgray",
                "float": "left"
            }
        } else {
            myStyles = {
                "width.%": 100,
                "background": "lightgray",
                "float": "left"
            }
        }

        return myStyles;
    }
}