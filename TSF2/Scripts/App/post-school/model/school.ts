export interface Agency {
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
}