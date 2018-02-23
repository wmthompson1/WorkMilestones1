export interface Import {
    Id: number;
    CreateDate: Date;
    OriginalName: string;
    Status: string;
    ErrorsFoundCount: number;
    Count: number;
    RowsProcessedCount: number;
    RowsNotProcessedCount: number;
    SurveyId: number;
    IsComplete: boolean;
    Comments: string;
}
