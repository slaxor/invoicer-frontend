/* eslint-disable */
let zeroPad = number => number <= 999 ? `000${number}`.slice(-3) : number;

function generateInvoices() {
  var inv = [];
  for (var i=1;i<=100;i++) {
    inv.push({
      id: 'invid'+zeroPad(i),
      number: '12345-'+zeroPad(i),
      contractId: 2,
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
      invoiceId: 'invid'+ zeroPad(i%10),
      deliveredAt: '2019-04-23T18:25:43.511Z',
      price: 17.95,
      quantity: 9,
      unit: 'Stunden',
      description: 'Dies und das Nummer ' + i,
      vatRate: 19
    });
  }
  return li;
}
// console.log(generateInvoices());
export default {
  lineItems: generateLineItems(),
  contracts: [
    { id: 1, name: 'foo<->bar', customerId: 'foo', issuerId: 'bar', },
    { id: 2, name: 'blah<->blub', customerId: 'blah', issuerId: 'blub', },
  ],
  contractParties: [
    {
      id: 'foo',
      name: 'Foo AG',
      coLine: null,
      telephone: '+49 123 31233123',
      email: 'accountant@foo-ag.de',
      city: 'Würzburg',
      country: 'Deutschland',
      postCode: '74322',
      street: 'ABC-Strasse 23',
      issuer: false,
    },
    {
      id: 'bar',
      name: 'Bar AG',
      coLine: 'George Greedy',
      telephone: '+49 123 31233123',
      email: 'gg@bar-ag.de',
      city: 'München',
      country: 'Deutschland',
      postCode: '84322',
      street: 'Ludwigsstrasse 23',
      issuer: true,
    },
    {
      id: 'blah',
      name: 'Blah AG',
      coLine: null,
      telephone: '+49 123 31233123',
      email: 'accountant@blah-ag.de',
      city: 'Würzburg',
      country: 'Deutschland',
      postCode: '74322',
      street: 'ABC-Strasse 23',
      issuer: false,
    },
    {
      id: 'blub',
      name: 'Blub AG',
      coLine: 'George Greedy',
      telephone: '+49 123 31233123',
      email: 'gg@blub-ag.de',
      city: 'München',
      country: 'Deutschland',
      postCode: '84322',
      street: 'Ludwigsstrasse 23',
      issuer: true,
    },
  ],
  invoices: generateInvoices(),
};

