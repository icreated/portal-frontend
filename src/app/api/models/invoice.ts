/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { InvoiceLine } from './invoice-line';
import { Payment } from './payment';
import { Tax } from './tax';

/**
 * Object Invoice
 */
export interface Invoice {
  billAddress?: Address;

  /**
   * The Business Partner of the order / invoice.
   */
  bpartnerName: string;

  /**
   * The currency of the invoice.
   */
  currency: string;

  /**
   * The transaction date of the invoice.
   */
  date: string;

  /**
   * The description of the invoice.
   */
  description?: string;

  /**
   * The document status of the invoice.
   */
  docStatus: string;

  /**
   * The document number of the invoice.
   */
  documentNo: string;

  /**
   * The grand total of the invoice.
   */
  grandTotal: number;
  id: number;
  lines?: Array<InvoiceLine>;
  payments?: Array<Payment>;

  /**
   * The PO reference of the invoice.
   */
  poReference?: string;
  taxes?: Array<Tax>;

  /**
   * The total lines of the invoice.
   */
  totalLines: number;
}
