import _ from 'lodash';
export default {
  customerById:  (state) => (id) => _.find(state.contract_parties, {id: id, issuer: false}),
  issuerById: (state) => (id) => _.find(state.contract_parties, {id: id, issuer: true}),
  contractById: (state) => (id) => _.find(state.contracts, {id: id}),
  invoices: (state) => state.invoices,
  invoiceByNumber: (state) => (num) => _.find(state.invoices, {number: num}),
  lineItemsByInvoiceId: (state) => (id) => _.filter(state.lineItems, {invoice_id: id}),
  contracts: (state) => state.contracts,
  issuers (state) {return _.filter(state.contract_parties, (cp) => {return cp.issuer;});},
  customers (state) {return _.filter(state.contract_parties, (cp) => {return !cp.issuer;});},
  errors: (state) => state.errors,
  filledInvoices: (state, getters) => {
    return _.map(state.invoices, (i) => {
      i.contract = getters.contractById(i.contract_id);
      i.contract.customer = getters.customerById(i.contract.customer_id);
      i.contract.issuer = getters.issuerById(i.contract.issuer_id);
      return i;
    });
  },
};
