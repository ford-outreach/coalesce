var get = Ember.get, set = Ember.set;

/**
  Maintains a cache of model-related promises

  @class Cache
*/
export default class Cache {

  constructor() {
    this._data = {};
  }

  addModel(model) {
    // for now we only add the model if some attributes are loaded,
    // eventually this will be on a per-attribute basis
    if(model.anyFieldsLoaded) {
      this.addPromise(model, Ember.RSVP.resolve());
    }
  }

  removeModel(model) {
    delete this._data[model.clientId];
  }

  addPromise(model, promise) {
    this._data[model.clientId] = promise;
  }

  getPromise(model) {
    Ember.assert("Model does not have a client id", model.clientId);
    return this._data[model.clientId];
  }

}