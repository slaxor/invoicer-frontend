/* eslint-disable */
let zeroPad = number => number <= 999 ? `000${number}`.slice(-3) : number;

function generateInvoices() {
  var inv = [];
  for (var i=1;i<=100;i++) {
    inv.push({
      id: 'invid'+zeroPad(i),
      number: '12345-'+zeroPad(i),
      contract_id: 2,
      amount: 12345.24,
      status: 'issued',
      dueAt: '2020-04-23T18:25:43.511Z'
    });
  }
  return inv;
}
function generateLineItems() {
  var li = [];
  for (var i=1;i<=100;i++) {
    li.push({
      id: 'liid'+zeroPad(i),
      invoice_id: 'invid'+ zeroPad(i%10),
      delivered_at: '2019-04-23T18:25:43.511Z',
      price: 17.95,
      quantity: 9,
      unit: 'Teile',
      description: 'Dies und das Nummer ' + i,
      vat_rate: 19
    });
  }
  return li;
}
// console.log(generateInvoices());
export default {
  lineItems: generateLineItems(),
  contracts: [
    { id: 1, name: 'foo<->bar', customer_id: 'foo', issuer_id: 'bar', },
    { id: 2, name: 'blah<->blub', customer_id: 'blah', issuer_id: 'blub', },
  ],
  contract_parties: [
    {
      id: 'foo',
      name: 'Foo AG',
      co_line: null,
      telephone: '+49 123 31233123',
      email: 'accountant@foo-ag.de',
      city: 'Würzburg',
      country: 'Deutschland',
      post_code: '74322',
      street: 'ABC-Strasse 23',
      issuer: false,
    },
    {
      id: 'bar',
      name: 'Bar AG',
      co_line: 'George Greedy',
      telephone: '+49 123 31233123',
      email: 'gg@bar-ag.de',
      city: 'München',
      country: 'Deutschland',
      post_code: '84322',
      street: 'Ludwigsstrasse 23',
      issuer: true,
    },
    {
      id: 'blah',
      name: 'Blah AG',
      co_line: null,
      telephone: '+49 123 31233123',
      email: 'accountant@blah-ag.de',
      city: 'Würzburg',
      country: 'Deutschland',
      post_code: '74322',
      street: 'ABC-Strasse 23',
      issuer: false,
    },
    {
      id: 'blub',
      name: 'Blub AG',
      co_line: 'George Greedy',
      telephone: '+49 123 31233123',
      email: 'gg@blub-ag.de',
      city: 'München',
      country: 'Deutschland',
      post_code: '84322',
      street: 'Ludwigsstrasse 23',
      issuer: true,
    },
  ],
  invoices: generateInvoices(),
};

