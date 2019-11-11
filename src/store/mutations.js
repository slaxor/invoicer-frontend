// import _ from 'lodash';
import { updateField } from 'vuex-map-fields';
export default {
  updateField,
  setInvoiceField (state, params) {
    state.invoice[params.field] = params.value;
  },
  setInvoice (state, invoice) {
    state.invoice = invoice;
    return this;
  },
  clearInvoice (state) {
    state.invoice = null;
  },
  setLineItem(state, lineItem) {
    state.lineItems = Object.assign({}, state.lineItems, lineItem);
  },
  deleteLineItem(state, lineItem) {
    const { lineItems } = state;
    const index = lineItems.indexOf(lineItem);
    index > -1 && lineItems.splice(index, 1);
  },
  updateLineItem(state, { item }) {
    let prevItem = state.lineItems.find(found => found.id === item.id);
    Object.assign(prevItem, item);
  },
  createLineItem(state, { item, invoiceId }) {
    // Remove `fakeId` in production and ommit id from `item` or generate a new one here
    const fakeId = `liid${this.state.lineItems.length.toString().padStart(3, '0')}`;
    const newItem = { ...item, id: fakeId, invoiceId };
    state.lineItems.push(newItem);
  },
  // Error mutations
  addError (state, err) {
    state.errors.push(err);
  },
  flushErrors (state) {
    state.errors = [];
  },
};
