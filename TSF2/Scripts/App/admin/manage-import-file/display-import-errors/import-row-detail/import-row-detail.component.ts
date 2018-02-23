import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../../admin.service";
import { ImportRowDetail } from "../../../model/ImportRowDetail";

@Component({
    selector: "import-row-detail",
    templateUrl: "/app/admin/manage-import-file/display-import-errors/import-row-detail/import-row-detail.component.html",
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-import-file/display-import-errors/import-row-detail/import-row-detail.component.css"]//,
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportRowDetailComponent implements OnInit {
    title: string = "Detail View";
    id: number;
    rowId: number;
    rowDetail: ImportRowDetail = new ImportRowDetail();
    //numberOfTicks = 0;

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router, private ref: ChangeDetectorRef) {
        this.id = this.route.snapshot.params['id'];
        
        this.rowId = this.route.snapshot.params['rowId'];
        
        this.rowDetail = new ImportRowDetail();        
    }

    ngOnInit() {
        this.adminService.getImportRowDetails(this.id, this.rowId)
          .subscribe(res => this.rowDetail = res);        
    }

    back() {
        this.router.navigate(['/display-import-errors', this.id]);
    }
}