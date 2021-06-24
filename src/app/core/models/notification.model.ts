export class Notification {

  message: string;
  createdOn: Date;
  createdBy: number;

  constructor(message: string, createdOn: Date, createdBy: number) {
      this.message = message;
      this.createdBy = createdBy;
      this.createdOn = createdOn;
  }
}
