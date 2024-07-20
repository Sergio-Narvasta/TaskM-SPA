export class SearchDto {
    status: string;
    expiredDate: string;

    constructor(status: string, expiredDate: string) {
        this.status = status;
        this.expiredDate = expiredDate;
    }
}
