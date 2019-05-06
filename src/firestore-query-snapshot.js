'use strict';

var _ = require('./lodash');
var DocumentSnapshot = require('./firestore-document-snapshot');


function MockFirestoreQuerySnapshot (ref, documentChanges, keyOrder, query) {
  this._ref = ref;
  this.documentChanges = _.cloneDeep(documentChanges) || {};
  this.keyOrder = keyOrder;
  this.size = _.size(this.keyOrder);
  this.empty = this.size === 0;
  this.query = query;

  var self = this;
  this.docs = _.map(keyOrder, function (key) {
    return new DocumentSnapshot(key, self._ref.doc(key), self.documentChanges[key].doc);
  });
}

MockFirestoreQuerySnapshot.prototype.forEach = function (callback, context) {
  _.forEach(this.docs, function (doc) {
    callback.call(context, doc);
  });
};

MockFirestoreQuerySnapshot.prototype.docChanges = function (options) {
  options = options || {};
  // Returns an array of the documents changes since the last snapshot. If this is the first snapshot, all documents will be in the list as added changes.

  // Parameters
  // Optional options: SnapshotListenOptions
  // SnapshotListenOptions that control whether metadata-only changes (i.e. only DocumentSnapshot.metadata changed) should trigger snapshot events.

  // Returns DocumentChange[]

  if (options.includeMetadataChanges) {
    throw ("NotImplemented");
  }

  var self = this;
  return _.map(_.filter(self.documentChanges, function(key) {return self.documentChanges[key] !== undefined;}), function (key) {
    return self.documentChanges[key];
  });

};

module.exports = MockFirestoreQuerySnapshot;
