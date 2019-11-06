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
  updateLineItemField(state, { id, field, value }) {
    const item = state.lineItems.find(fItem => fItem.id === id);
    // eslint-disable-next-line no-console
    if (item) {
      item[field] = value;
    }
  },
  // Error mutations
  addError (state, err) {
    state.errors.push(err);
  },
  flushErrors (state) {
    state.errors = [];
  },
};
