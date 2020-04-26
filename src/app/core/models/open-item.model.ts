export interface OpenItem {
	invoiceId: number;
	orderId: number;
	bpartnerId: number;
	currencyId: number;
	documentNo: string;
	description: string;
	docStatus: string;
	isSOTrx: boolean;
	isActive: boolean;
	dateOrdered: string;
	dateInvoiced: string;
	netDays: number;
	dueDate: string;
	totalLines: number;
	grandTotal: number;
	paidAmt: number;
	openAmt: number;
 }
