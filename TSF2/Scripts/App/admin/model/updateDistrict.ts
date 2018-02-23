export class UpdateDistrict {

    //id: number;
    //parentId: number;
    //countyName: string;
    //agencyCode: string;
    //agencyName: string;
    //isActive: boolean;

    constructor(
        public id: number,
        public parentId: number,
        public countyName: string,
        public agencyCode: string,
        public agencyName: string,
        public isActive: boolean
    ) { }
}