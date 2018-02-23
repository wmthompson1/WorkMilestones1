import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../admin.service";
import { ImportError } from "../../model/ImportError";

@Component({
    selector: "display-import-errors",
    templateUrl: "app/admin/manage-import-file/display-import-errors/display-import-errors.component.html",
    styleUrls: ["app/admin/manage-import-file/display-import-errors/display-import-errors.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class DisplayImportErrorsComponent implements OnInit {
    id: number;
    title: string = "Import Errors";
    importErrors: Array<ImportError> = [] as Array<ImportError>;
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.adminService
            .getImportErrors(this.id)
            .subscribe(res => this.importErrors = res);
    }
}