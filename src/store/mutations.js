// import _ from 'lodash';
export default {
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
  // Error mutations
  addError (state, err) {
    state.errors.push(err);
  },
  flushErrors (state) {
    state.errors = [];
  },
};
