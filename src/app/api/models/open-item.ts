/* tslint:disable */
/* eslint-disable */
export interface OpenItem {
  bpartnerId?: number;
  bpartnerLocationId?: number;
  currencyId?: number;

  /**
   * The invoice date of the invoice.
   */
  dateInvoiced?: string;

  /**
   * The order date of the invoice.
   */
  dateOrdered?: string;

  /**
   * The description of the invoice.
   */
  description?: string;

  /**
   * The document status of the invoice.
   */
  docStatus?: string;

  /**
   * The document number of the invoice.
   */
  documentNo: string;

  /**
   * The due date of the invoice.
   */
  dueDate?: string;

  /**
   * The grand total of the invoice.
   */
  grandTotal: number;
  invoiceId?: number;

  /**
   * The invoice is active.
   */
  isActive?: boolean;

  /**
   * The transaction type is sale or purchase.
   */
  isSOTRX?: boolean;
  netDays?: number;

  /**
   * The open amount of the invoice.
   */
  openAmt: number;
  orderId?: number;

  /**
   * The paid amount of the invoice.
   */
  paidAmt?: number;

  /**
   * The total lines of the invoice.
   */
  totalLines: number;
}
