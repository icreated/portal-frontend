import {DocumentItem} from './document-item.model';
import {Payment} from './payment.model';
import {Tax} from './tax.model';
import {PriceListProduct} from './pricelist-product.model';
import {Address} from './address.model';

export interface Invoice extends DocumentItem {
  billAddress: Address;
  payments: Payment[];
  invoices: DocumentItem;
  lines: PriceListProduct[];
  taxes: Tax[];

}
