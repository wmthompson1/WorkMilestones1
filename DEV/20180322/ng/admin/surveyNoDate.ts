export interface ISurveyNoDate {
    id: number;
    name: string;
    description?: string;
    surveyTypeCode?: string;
    instructions?: string;
    isLocked?: boolean;
    createdBy?: string;
    updatedBy?: string;
    schoolYear?: string;
    leaverYear?: string;
    isReported?: boolean;
}
