export interface DistrictSummary {
    Id: any;
    ESD: string;
    ESDAgencyId: number;
    DistrictAgencyId: number;
    DistrictName: string;
    IsVerified: boolean;
    Progress: number;
    ResponseRate: number;
    ContactRate: number;
    NotStartedCount: number;
    StartedCount: number;
    FinishedCount: number;
    TotalCount: number;
    DistrictProgress: number;
    DistrictContactRate: number;
    DistrictResponseRate: number;
}