export class agencySummary {
    id: number;
    parentId: number;
    countyName: string;
    agencyCode: string;
    agencyName: string;
    mailAddress: string;
    city: string;
    zipCode: string;
    schoolLevelCode: string;
    gradeSpan: string;
    isActive: boolean;
    agencyType: string;
    effectiveDate: Date;
    endDate: Date;
    agencySize: string;
    notes: string;

    constructor(
        Id: number,
        ParentId: number,
        CountyName: string,
        AgencyCode: string,
        AgencyName: string,
        MailAddress: string,
        City: string,
        ZipCode: string,
        SchoolLevelCode: string,
        GradeSpan: string,
        IsActive: boolean,
        AgencyType: string,
        EffectiveDate: Date,
        EndDate: Date,
        AgencySize: string,
        Notes: string
    ) { }
}