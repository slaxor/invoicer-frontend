import { describe,it } from 'mocha';
import { expect } from 'chai';
import { getters } from './store';
import state from './testdata';

let store = {state: state};

describe('getters', () => {
  describe('customerById', () => {
    const { customerById } = getters;
    it('finds an existing customer by its id', () => {
      const c = customerById(store, 'foo');
      expect(c).to.equal(true);
    });
  });
});
