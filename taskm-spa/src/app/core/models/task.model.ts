export class Task {
  id: number;
  idString: string;
  name: string;
  description?: string;
  expiredDate: Date;
  priority: number;
  order: number;
  status: number;
  business: number;
  businessStr: string;
  createDate: Date;

  constructor(
      id: number,
      idString: string,
      name: string,
      expiredDate: Date,
      priority: number,
      order: number = 1,
      status: number,
      business: number,
      businessStr: string,
      createDate: Date = new Date(),
      description?: string
  ) {
      this.id = id;
      this.idString = idString;
      this.name = name;
      this.description = description;
      this.expiredDate = expiredDate;
      this.priority = priority;
      this.order = order;
      this.status = status;
      this.business = business;
      this.businessStr = businessStr;
      this.createDate = createDate;
  }
}