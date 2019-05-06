'use strict';

var _ = require('./lodash');
var DocumentSnapshot = require('./firestore-document-snapshot');


function MockFirestoreDocumentChange (doc, newIndex, oldIndex, type) {
  this.doc = doc;
  this.newIndex = newIndex;
  this.oldIndex = oldIndex;
  this.type = type;
}


module.exports = MockFirestoreDocumentChange;
