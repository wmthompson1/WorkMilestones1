export interface ISurvey {
    id: number;
    name: string;
    description: string;
    surveyTypeCode: string;
    instructions: string;
    isLocked: boolean;
    closeDate: string;
    createDate: string;
    createdBy: string;
    updateDate: string;
    updatedBy: string;
    schoolYear: string;
    leaverYear: string;
    isReported: boolean;
    openDate: string;
}