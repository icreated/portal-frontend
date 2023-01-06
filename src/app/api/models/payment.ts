/* tslint:disable */
/* eslint-disable */
export interface Payment {

  /**
   * The currency of the payment.
   */
  currency?: string;

  /**
   * The transaction date of the payment.
   */
  date?: string;

  /**
   * The description of the payment.
   */
  description?: string;

  /**
   * The document status of the payment.
   */
  docStatus?: string;

  /**
   * The document number of the payment.
   */
  documentNo?: string;
  id?: number;

  /**
   * The amount of the payment.
   */
  payAmt?: number;

  /**
   * The tender type of the payment.
   */
  tenderType?: string;

  /**
   * The transaction ID of the payment.
   */
  trxid?: string;
}
