export interface Payment {
    id:number;
    documentNo:string;
    description:string;
    docStatus:string;
    payAmt:number;
    trxid:string;
    currency:string;
    tenderType:string;
  }