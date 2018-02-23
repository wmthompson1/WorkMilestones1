import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PsService } from "../../ps.service";
import { DistrictSummary } from "../../model/DistrictSummary";
import { ReportsService } from "../../../reports/reports.service";
import { AuthService } from "../../../auth.service";

@Component({
    selector: "ps-district-list",
    templateUrl: "app/Post-School/manage-post-school/manage-districts/ps-district-list.component.html",
    styleUrls: ["app/Post-School/manage-post-school/manage-districts/ps-district-list.component.css"],
    providers: [PsService, ReportsService, AuthService],
    encapsulation: ViewEncapsulation.None
})
export class PSDistrictListComponent implements OnInit {

    districts: Array<DistrictSummary> = [] as Array<DistrictSummary>;
    AgencyName: string;
    leaverYear: string;
    progressValue: string;
    email: string = "stanleyd@seattleu.edu";
    agencyId: string;
    
    constructor(private route: ActivatedRoute, private psService: PsService, private router: Router, private reportsService: ReportsService, private authService: AuthService) {
        this.AgencyName = "CCTS";
        this.leaverYear = this.route.snapshot.params['schoolYear'];
        this.agencyId = this.route.snapshot.params['agencyId'];

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }

    ngOnInit() {

        this.psService
            .getDistrictsSummary(+this.agencyId, this.leaverYear)
            .subscribe(result => this.districts = result);
    }

    getProgressValue(progress: number): number {
        var progressString = (progress * 100.00).toFixed(0);
        return +progressString;
    }

    getMyStyles(progress: number, totalCount: number) {
        this.progressValue = (progress * 100.00).toFixed(0);
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

    getPercent(total: number): number {
        var newTotal = (total * 100).toFixed(2);
        return +newTotal;
    }

    navigateToSSID(ssid: string) {
        this.router.navigate(['/ps-students-list', 0, this.leaverYear, ssid, 0]);
    }

    async doSSIDSearch(ssid: string) {
        this.psService
            .doSSIDSearch(ssid, this.email, this.leaverYear, +'-1')
            .subscribe(res => {
                this.router.navigate(['/ps-students-list/', res.SchoolId, this.leaverYear, ssid]);
            });
        
            
    }

    getContactRateReport() {
        let fileName: string = this.AgencyName + "-Indicator14-Extract.xlsx";

        this.reportsService
            .getPostSchoolContactReport(this.agencyId, this.leaverYear, this.AgencyName)
            .subscribe(blob => {
                var link: any = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            });
    }
}