import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AuthService } from "../../auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { User } from "../../User";
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Rx';
import { animate } from '@angular/animations';

@Component({
    selector: "user-list",
    templateUrl: "app/admin/manage-user/user-list.component.html",
    providers: [AuthService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-user/user-list.component.css"]
})

export class UserListComponent implements OnInit {
    title: string = "Manage Users";
    gridData: GridDataResult;
    agencyId: number = 90;
    skip: number = 0;
    take: number = 20;
    private state: State = {
        skip: 0,
        take: 5,
        filter: {
            logic: "and",
            filters: [{ field: 'email', operator: 'contains', value: '' }]//, { field: "Agency", operator: "contains", value: "" }, { field: "FirstName", operator: "contains", value: "" },
            //{field: "LastName", operator: "contains", value: ""}]
        }
    };
    userList: Array<User> = [] as Array<User>;
    private type: 'numeric' | 'input' = 'numeric';
    private pageSizes: boolean = true;
    private previousNext: boolean = true;
    private info: boolean = true;
    private pageSize: number = 10;
    public sort: SortDescriptor[] = [];
    public unSort: boolean = true;
    public multiple: boolean = false;
    public editDataItem: User;
    public isNew: boolean;

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
        //this.gridData = adminService;             
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { userList: User[] }) => {
                this.userList = data.userList;
            });
        this.loadItems();
    }
    
    @ViewChild(GridComponent) private grid: GridComponent;

    sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridData = {
            data: orderBy(this.userList.slice(this.state.skip, this.state.skip + this.pageSize), this.sort),
            total: this.userList.length
        };          
    }

    pageChange({ skip, take }: PageChangeEvent): void {
        this.state.skip = skip;
        this.pageSize = take;
        this.loadItems();
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.userList, this.state);
    }

    addHandler(): void {
        this.router.navigate(["/create-user"]);
    }

    editHandler({ dataItem }) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    saveHandler(userListItem: User) {
        //this.authService.save(userListItem, this.isNew);
        //this.editDataItem = undefined;
    }

    removeHandler({ dataItem }) {
        var index = this.userList.indexOf(dataItem);
        this.authService.remove(dataItem.id).subscribe(() => { });
        this.userList.splice(index, 1);
        this.loadItems();
    }
}