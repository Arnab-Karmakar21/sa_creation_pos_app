export const Billformater = async (
  payload: BillformaterProps,
): Promise<string> => {
  let addr: string[] | any = payload?.address?.match(/.{1,29}/g);
  let bill: string = `
  [C]<font size='tall'>${payload.title}</font>[C]\n[C]`;
  !!addr && addr?.length >= 1
    ? (bill =
        bill +
        `
  ${addr[0]}`)
    : '';
  !!addr && addr?.length >= 2
    ? (bill =
        bill +
        `
${addr[1]}`)
    : '';
  !!addr && addr?.length >= 3
    ? (bill =
        bill +
        `
${addr[2]}`)
    : '';
  !!addr && addr?.length >= 4
    ? (bill =
        bill +
        `
${addr[3]}`)
    : '';
  bill =
    bill +
    `
\n[L]
********************************\n[L]
Cust Name  : ${payload.customer_name}
Mobile No. : ${payload.phone_no}
Order No.  : ${payload.invoice_no}
Bag No.    : ${payload.bag_id ? payload.bag_id : 'XXXXXXXXX'}
Unit       : ${payload.unit_name}
Store      : ${payload.store} 
Date       : ${payload.date}
********************************\n[L]
Item Name               
Amount(Rs)
SNo    Qty    MRP(Rs)   Disc(Rs)
--------------------------------`;
  payload.item?.forEach((m, index) => {
    bill =
      bill +
      `
${m.product_name}
${m.selling_price}
${index + 1}     ${m.quantity}     ${m.mrp}     ${m.discount}`;
  });

  bill =
    bill +
    `
------------------------------
PAYMENT SUMMERY(Rs)
Payment Type    : ${payload.payment_type}
Amount Recived  : ${payload.ammount_recived}
Total           : ${payload.total}
Amount Return   : ${payload.return_amount}
--------------------------------
\n[C]<barcode type='128' width='55' text='above'>${payload.invoice_no}</barcode>
[C]Any exchange/return/dispute has to be reported within 3 business days with original invoice
[C]<font size='tall'>${'           '}Thank You</font>[C]
`;

  return bill;
};

interface BillformaterProps {
  title?: string;
  address?: string;
  customer_name?: string;
  phone_no?: string;
  invoice_no?: string;
  date?: string;
  unit_name?: string;
  store?: string;
  item?: items[];
  payment_type?: string;
  ammount_recived?: string;
  total?: string;
  return_amount?: string;
  bag_id?: string;
}
export interface items {
  product_name: string;
  selling_price: string;
  quantity: string;
  mrp: string;
  discount: string;
}

`
    [C]<font size='tall'>SRISHTISHREE</font>[C]\n[C]
    Dhakuria, Jodhpur Park,
  Kolkata, West Bengal 700068
\n[L]
********************************\n[L]
Customer Name: Sudipta Das
Mobile No.   : 8013320216
Invoice No.  : OD111692601074
Date: 20/12/2023 12:30 PM
********************************\n[L]
Item Name               
Amount(Rs)
SNo    Qty    MRP(Rs)   Disc(Rs)
--------------------------------
Silk Red Kantha Stich Saree
2021.00
1       2       2500        480
Silk Red Kantha Stich Saree
2021.00
1       2       2500        480
Silk Red Kantha Stich Saree
2021.00
1       2       2500        480
Silk Red Kantha Stich Saree
2021.00
1       2       2500        480
Silk Red Kantha Stich Saree
2021.00
1       2       2500        480
--------------------------------
PAYMENT SUMMERY(Rs)
Payment Type    : CASH
Amount Recived  : 4500
Total           : 4088
Amount Return   : 412
--------------------------------
\n[C]<barcode type='128' width='55' text='above'>OD111692601074</barcode>
[C]<font size='tall'>${'           '}Thank You</font>[C]
`;
