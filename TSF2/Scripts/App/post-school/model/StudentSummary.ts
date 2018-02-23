export interface StudentSummary {
    Id: number;
    SubjectSurveyId: number,
    AgencyCollectionId: number,
    AgencyId: number,
    SurveyId: number,
    CollectionYear: string,
    SubjectName: string,
    CreateDate: Date,
    CreatedBy: string,
    StartDate: Date,
    CompletionDate: Date,
    SubjectInitials: string,
    IsDemoComplete: boolean,
    IsLocked: boolean,
    SSID: string,
    Building: string,
    Status: string,
    StatusText: string,
    IsSurveyLocked: boolean,
    IsDemographicsLocked: boolean
}