import array_from from '../utils/array_from';
// XXX: this is just needed since payload extends this class, should eventually
// change that
import BaseClass from '../utils/base_class';
import fork from '../utils/fork';

/**
  An unordered collection of unique entities.
  
  Uniqueness is determined by the `clientId`. If a entity is added and an
  equivalent entity already exists in the EntitySet, the existing entity will be
  overwritten.

  @class EntitySet
*/
export default class EntitySet extends BaseClass {
  
  guidFor(entity) {
    console.assert(entity.clientId, "Entity must have a clientId set");
    return entity.clientId;
  }

  constructor(iterable) {
    this._size = 0;
    if(iterable) {
      this.addObjects(iterable);
    }
  }
  
  get size() {
    return this._size;
  }

  /**
    Clears the set. This is useful if you want to reuse an existing set
    without having to recreate it.

    ```javascript
    var models = new EntitySet([post1, post2, post3]);
    models.size;  // 3
    models.clear();
    models.size;  // 0
    ```

    @method clear
    @return {EntitySet} An empty Set
  */
  clear() {
    var len = this._size;
    if (len === 0) { return this; }

    var guid;

    for (var i=0; i < len; i++){
      guid = this.guidFor(this[i]);
      delete this[guid];
      delete this[i];
    }

    this._size = 0;

    return this;
  }

  add(obj) {

    var guid = this.guidFor(obj),
        idx  = this[guid],
        len  = this._size;

    if (idx>=0 && idx<len && (this[idx] && this[idx].isEqual(obj))) {
      // overwrite the existing version
      if(this[idx] !== obj) {
        this[idx] = obj;
      }
      return this; // added
    }

    len = this._size;
    this[guid] = len;
    this[len] = obj;
    this._size = len+1;

    return this;
  }

  delete(obj) {

    var guid = this.guidFor(obj),
        idx  = this[guid],
        len = this._size,
        isFirst = idx === 0,
        isLast = idx === len-1,
        last;


    if (idx>=0 && idx<len && (this[idx] && this[idx].isEqual(obj))) {
      // swap items - basically move the item to the end so it can be removed
      if (idx < len-1) {
        last = this[len-1];
        this[idx] = last;
        this[this.guidFor(last)] = idx;
      }

      delete this[guid];
      delete this[len-1];
      this._size = len-1;
      return true;
    }

    return false;
  }

  has(obj) {
    return this[this.guidFor(obj)]>=0;
  }

  copy(deep=false) {
    var C = this.constructor, ret = new C(), loc = this._size;
    ret._size = loc;
    while(--loc>=0) {
      ret[loc] = deep ? this[loc].copy() : this[loc];
      ret[this.guidFor(this[loc])] = loc;
    }
    return ret;
  }
  
  fork(graph) {
    var C = this.constructor, ret = new C(), loc = this._size;
    ret._size = loc;
    while(--loc>=0) {
      ret[loc] = fork(this[loc], graph);
      ret[this.guidFor(this[loc])] = loc;
    }
    return ret;
  }
  
  forEach(callbackFn, thisArg = undefined) {
    for (var i=0; i < this._size; i++) {
      callbackFn.call(thisArg, this[i], this[i], this);
    }
  }

  toString() {
    var len = this.size, idx, array = [];
    for(idx = 0; idx < len; idx++) {
      array[idx] = this[idx];
    }
    return `EntitySet<${array.join(',')}>`;
  }
  
  get(entity) {
    var idx = this[this.guidFor(entity)];
    if(idx === undefined) return;
    return this[idx];
  }

  getByClientId(clientId) {
    var idx = this[clientId];
    if(idx === undefined) return;
    return this[idx];
  }
  
  *values() {
    for (var i=0; i < this._size; i++) {
      yield this[i];
    }
  }

  //
  // Backwards compat. methods
  //
  addObjects(iterable) {
    if(typeof iterable.forEach === 'function') {
      iterable.forEach(function(item) {
        this.add(item);
      }, this);
    } else {
      for (var item of iterable) {
        this.add(item);
      }
    }
    return this;
  }
  
  removeObjects(iterable) {
    if(typeof iterable.forEach === 'function') {
      iterable.forEach(function(item) {
        this.delete(item);
      }, this);
    } else {
      for (var item of iterable) {
        this.delete(item);
      }
    }
    return this;
  }
  
  toArray() {
    return array_from(this);
  }

}

var aliases = {
  'remove': 'delete',
  'contains': 'has',
  'addObject': 'add',
  'removeObject': 'delete',
  'getModel': 'get',
  'getForClientId': 'getByClientId'
}

for(var alias in aliases) {
  if(!aliases.hasOwnProperty(alias)) continue;
  var target = aliases[alias];
  EntitySet.prototype[alias] = EntitySet.prototype[target];
}


// Make iterable
Object.defineProperty(EntitySet.prototype, Symbol.iterator, {
  value: EntitySet.prototype.values,
  configurable: true,
  writable: true
});
