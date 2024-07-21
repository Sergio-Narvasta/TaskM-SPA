export class TaskCreateDto {
    id: string;
    name: string;
    description?: string;
    expiredDate: Date;
    priority: number;
    order: number;
    status: number;
    business: number;
    createDate: Date;
  
    constructor(
        id: string,
        name: string,
        expiredDate: Date,
        priority: number,
        order: number = 1,
        status: number,
        business: number,
        createDate: Date = new Date(),
        description?: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.expiredDate = expiredDate;
        this.priority = priority;
        this.order = order;
        this.status = status;
        this.business = business;
        this.createDate = createDate;
    }
  }