// import _ from 'lodash';
import axios from 'axios';
axios.defaults.baseURL = '/api';
export default {
  newInvoice ({ commit }) {
    const defaultInvoice = {
    };
    commit('setInvoice', defaultInvoice);
  },
  setInvoice ({ commit }, invoice) {
    commit('setInvoice', invoice);
  },
  setInvoiceField ({ commit }, params) {
    commit('setInvoiceField', params);
  },
  fetchInvoice ({ commit }, secRef) {
    return axios.get(`/invoices/${secRef}`)
      .then(({ data }) => {
        commit('setInvoice', data);
      },
      (e) => {
        commit('addError', {
          title: 'Fehler beim Laden',
          msg: e.response.data.message,
        });
      });
  },
  saveInvoice ({ state, commit }, secRef) {
    const res = axios.put(`/invoices/${secRef}`, state.invoice)
      .then(({ data }) => {
        commit('setInvoice', res);
        return data;
      },
      (e) => {
        commit('addError', {
          title: 'Fehler beim Speichern',
          msg: e.response.data.message,
        });
      });
  },
  createInvoice ({ state, commit }) {
    return axios.post('/invoices', state.invoice)
      .then(({ data }) => data,
        (e) => {
          commit('addError', {
            title: 'Fehler beim Erstellen',
            msg: e.response.data.message,
          });
        });
  },
  clearInvoice ({ commit }) {
    commit('clearInvoice');
  },
  validateInvoice () {
    // ⚠
    // const existsOnServer = this.value.ID.length >= 16
    // const enoughParticipants = this.value.participants.length > 2
    // const allPsHaveAName =
    // const allPsHaveAnEmail =
    // const participantsArePlaying = this.value.participants...  // state must be at least "inviteAccepted"
    //
    // return existsOnServer && enoughParticipants
    return true;
  },
};
