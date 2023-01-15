/* tslint:disable */
/* eslint-disable */

/**
 * Credit card object
 */
export interface CreditCard {

  /**
   * The credit card expiration month.
   */
  creditCardExpMM: number;

  /**
   * The credit card expiration year.
   */
  creditCardExpYY: number;

  /**
   * The credit card name.
   */
  creditCardName: string;

  /**
   * The credit card number.
   */
  creditCardNumber: string;

  /**
   * The credit card type.
   */
  creditCardType: string;

  /**
   * The credit card verification value.
   */
  creditCardVV: string;

  /**
   * The payment amount.
   */
  paymentAmount: number;
}
