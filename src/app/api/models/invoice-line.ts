/* tslint:disable */
/* eslint-disable */
export interface InvoiceLine {

  /**
   * The description of the invoice line.
   */
  description?: string;
  id: number;

  /**
   * The line number of the invoice line.
   */
  line: number;

  /**
   * The line net amount of the invoice line.
   */
  lineNetAmt: number;

  /**
   * The name of the invoice line.
   */
  name: string;

  /**
   * The price of the invoice line.
   */
  price: number;

  /**
   * The price list of the invoice line.
   */
  priceList: number;

  /**
   * The quantity of the invoice line.
   */
  qty: number;
}
