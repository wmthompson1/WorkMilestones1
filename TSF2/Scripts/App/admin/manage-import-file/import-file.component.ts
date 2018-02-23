import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Import } from "../model/import";
import { AdminService } from "../admin.service"; 

@Component({
    selector: "import-file",
    templateUrl: "app/admin/manage-import-file/import-file.component.html",
    styleUrls: ["app/admin/manage-import-file/import-file.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class ImportFileComponent {
    title: string = "Import Post School Survey Data";
    imports: Array<Import> = [] as Array<Import>;
    data: any;
    fileString: string;

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.adminService
            .getImportsList()
            .subscribe(res => this.imports = res);
    }

    selectFiles(fileInput: any) {
        //https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
        //https://stackoverflow.com/questions/45441962/how-to-upload-a-csv-file-and-read-them-using-angular2
        let file = fileInput.target.files[0];
        let fileName = file.name;
        let fileType = file.type;

        let formData: FormData = new FormData();
        formData.append('file', file, fileName);
        let reader: FileReader = new FileReader();

        //reader.readAsText(file, "UTF-8");

        //reader.onloadend = (e) => {
        //    this.fileString = reader.result;
        //}
        
        this.adminService.uploadFile(formData)//this.fileString)
            .subscribe(res => {
                    alert("File Import Succeeded");
                },
                error => {
                    alert('File import failed');
                });
    }

    deleteImport(id: number) {
        this.adminService.deleteImport(id)
            .subscribe(res => {
                    alert("Import deleted successfuly.");
                },
                error => {
                    alert("Import delete failed.");
                });
    }

    displayErrors(id: number) {
        this.router.navigate(['/display-import-errors', id]);
    }
}