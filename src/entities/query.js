import Collection from './collection';  

/**
  Represents a query.
  
  TODO session aliased methods
*/
export default class Query extends Collection {
  
  constructor(type, params) {
    this._type = type;
    this._params = params;
    super();
  }
  
  get params() {
    return this._params;
  }
  
  get type() {
    return this._type;
  }
  
  get clientId() {
    return this.constructor.clientId(this.type, this.params);
  }
  
  // TODO consider using hash instead of stringified params
  static clientId(type, params) {
    return `$${type.typeKey}$${JSON.stringify(params)}`;
  }
  
}