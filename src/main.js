
import Ep from './namespace';

import Adapter from './adapter';
import IdManager from './id_manager';

import {setupContainer} from './ember';

import ModelArray from './collections/model_array';
import ModelSet from './collections/model_set';

import MergeStrategy from './merge/base';
import PerField from './merge/per_field';

import Model from './model/model';
import './model/diff';
import Errors from './model/errors';
import ModelPromise from './model/promise';

import RestErrorsSerializer from './rest/serializers/errors';
import PayloadSerializer from './rest/serializers/payload';
import EmbeddedManager from './rest/embedded_manager';
import Operation from './rest/operation';
import OperationGraph from './rest/operation_graph';
import Payload from './rest/payload';
import RestAdapter from './rest/rest_adapter';
import RestErrors from './rest/rest_errors';

import ActiveModelAdapter from './active_model/active_model_adapter';
import ActiveModelSerializer from './active_model/serializers/model';

import Serializer from './serializers/base';
import BelongsToSerializer from './serializers/belongs_to';
import BooleanSerializer from './serializers/boolean';
import DateSerializer from './serializers/date';
import HasManySerializer from './serializers/has_many';
import IdSerializer from './serializers/id';
import NumberSerializer from './serializers/number';
import ModelSerializer from './serializers/model';
import RevisionSerializer from './serializers/revision';
import StringSerializer from './serializers/string';

import CollectionManager from './session/collection_manager';
import InverseManager from './session/inverse_manager';
import Session from './session/session';

import isEqual from './utils/is_equal';

import DebugAdapter from './debug/debug_adapter';

Ep.Adapter = Adapter;
Ep.IdManager = IdManager;
Ep.setupContainer = setupContainer;

Ep.ModelArray = ModelArray;
Ep.ModelSet = ModelSet;

Ep.MergeStrategy = MergeStrategy;
Ep.PerField = PerField;

Ep.Model = Model;
Ep.Errors = Errors;

Ep.ModelPromise = ModelPromise;

Ep.RestErrorsSerializer = RestErrorsSerializer;
Ep.PayloadSerializer = PayloadSerializer;
Ep.EmbeddedManager = EmbeddedManager;
Ep.Operation = Operation;
Ep.OperationGraph = OperationGraph;
Ep.Payload = Payload;
Ep.RestAdapter = RestAdapter;
Ep.RestErrors = RestErrors;

Ep.ActiveModelAdapter = ActiveModelAdapter;
Ep.ActiveModelSerializer = ActiveModelSerializer;

Ep.Serializer = Serializer;
Ep.BelongsToSerializer = BelongsToSerializer;
Ep.BooleanSerializer = BooleanSerializer;
Ep.DateSerializer = DateSerializer;
Ep.HasManySerializer = HasManySerializer;
Ep.IdSerializer = IdSerializer;
Ep.NumberSerializer = NumberSerializer;
Ep.ModelSerializer = ModelSerializer;
Ep.RevisionSerializer = RevisionSerializer;
Ep.StringSerializer = StringSerializer;

Ep.CollectionManager = CollectionManager;
Ep.InverseManager = InverseManager;
Ep.Session = Session;

Ep.isEqual = isEqual;

Ep.DebugAdapter = DebugAdapter;

export default Ep;