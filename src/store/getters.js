import _ from 'lodash';
import { getField } from 'vuex-map-fields';
export default {
  getField,
  customerById:  (state) => (id) => _.find(state.contractParties, {id: id, issuer: false}),
  issuerById: (state) => (id) => _.find(state.contractParties, {id: id, issuer: true}),
  contractById: (state) => (id) => _.find(state.contracts, {id: id}),
  invoices: (state) => state.invoices,
  invoiceByNumber: (state) => (num) => _.find(state.invoices, {number: num}),
  lineItemsByInvoiceId: (state) => (id) => _.filter(state.lineItems, {invoiceId: id}),
  contracts: (state) => state.contracts,
  issuers (state) {return _.filter(state.contractParties, (cp) => {return cp.issuer;});},
  customers (state) {return _.filter(state.contractParties, (cp) => {return !cp.issuer;});},
  errors: (state) => state.errors,
  filledInvoices: (state, getters) => {
    return _.map(state.invoices, (i) => {
      i.contract = getters.contractById(i.contractId);
      i.contract.customer = getters.customerById(i.contract.customerId);
      i.contract.issuer = getters.issuerById(i.contract.issuerId);
      return i;
    });
  },
};
