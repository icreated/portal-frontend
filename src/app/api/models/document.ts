/* tslint:disable */
/* eslint-disable */

/**
 * Order or Invoice for table display
 */
export interface Document {

  /**
   * The Business Partner of the order / invoice.
   */
  bpartnerName?: string;

  /**
   * The currency of the order / invoice.
   */
  currency?: string;

  /**
   * The transaction date of the order / invoice.
   */
  date?: string;

  /**
   * The description of the order / invoice.
   */
  description?: string;

  /**
   * The document status of the order / invoice.
   */
  docStatus?: string;

  /**
   * The document number of the order / invoice.
   */
  documentNo?: string;

  /**
   * The grand total of the order / invoice.
   */
  grandTotal?: number;
  id?: number;

  /**
   * The PO reference of the order / invoice.
   */
  poReference?: string;

  /**
   * The total lines of the order / invoice.
   */
  totalLines?: number;
}
