(function (window, plugin) {
  "use strict";

  let name = "Collectable";
  if (typeof module === 'object' && module.exports) module.exports = plugin(window);else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') exports = plugin(window);else if (typeof define === 'function' && define.amd) define([name], [], plugin(window));else window[name] = plugin(window);
})(typeof window !== "undefined" ? window : this, function (window) {
  ////////////////////////////////////////
  let Collectable = function Collectable(collection) {
    if (collection !== undefined && !Array.isArray(collection) && typeof collection !== 'object') {
      this.items = [collection];
    } else if (collection instanceof this.constructor) {
      this.items = collection.all();
    } else {
      this.items = collection || [];
    }
  };

  if (typeof Symbol !== 'undefined') {
    const SymbolIterator = require('./methods/symbol.iterator');

    Collectable.prototype[Symbol.iterator] = SymbolIterator;
  }

  Collectable.prototype.toJSON = function toJSON() {
    return this.items;
  };

  Collectable.prototype.all = require('./methods/all');
  Collectable.prototype.average = require('./methods/average');
  Collectable.prototype.avg = require('./methods/average');
  Collectable.prototype.chunk = require('./methods/chunk');
  Collectable.prototype.collapse = require('./methods/collapse');
  Collectable.prototype.combine = require('./methods/combine');
  Collectable.prototype.concat = require('./methods/concat');
  Collectable.prototype.contains = require('./methods/contains');
  Collectable.prototype.count = require('./methods/count');
  Collectable.prototype.countBy = require('./methods/countBy');
  Collectable.prototype.crossJoin = require('./methods/crossJoin');
  Collectable.prototype.dd = require('./methods/dd');
  Collectable.prototype.diff = require('./methods/diff');
  Collectable.prototype.diffAssoc = require('./methods/diffAssoc');
  Collectable.prototype.diffKeys = require('./methods/diffKeys');
  Collectable.prototype.dump = require('./methods/dump');
  Collectable.prototype.duplicates = require('./methods/duplicates');
  Collectable.prototype.each = require('./methods/each');
  Collectable.prototype.eachSpread = require('./methods/eachSpread');
  Collectable.prototype.every = require('./methods/every');
  Collectable.prototype.except = require('./methods/except');
  Collectable.prototype.filter = require('./methods/filter');
  Collectable.prototype.first = require('./methods/first');
  Collectable.prototype.firstWhere = require('./methods/firstWhere');
  Collectable.prototype.flatMap = require('./methods/flatMap');
  Collectable.prototype.flatten = require('./methods/flatten');
  Collectable.prototype.flip = require('./methods/flip');
  Collectable.prototype.forPage = require('./methods/forPage');
  Collectable.prototype.forget = require('./methods/forget');
  Collectable.prototype.get = require('./methods/get');
  Collectable.prototype.groupBy = require('./methods/groupBy');
  Collectable.prototype.has = require('./methods/has');
  Collectable.prototype.implode = require('./methods/implode');
  Collectable.prototype.intersect = require('./methods/intersect');
  Collectable.prototype.intersectByKeys = require('./methods/intersectByKeys');
  Collectable.prototype.isEmpty = require('./methods/isEmpty');
  Collectable.prototype.isNotEmpty = require('./methods/isNotEmpty');
  Collectable.prototype.join = require('./methods/join');
  Collectable.prototype.keyBy = require('./methods/keyBy');
  Collectable.prototype.keys = require('./methods/keys');
  Collectable.prototype.last = require('./methods/last');
  Collectable.prototype.macro = require('./methods/macro');
  Collectable.prototype.make = require('./methods/make');
  Collectable.prototype.map = require('./methods/map');
  Collectable.prototype.mapSpread = require('./methods/mapSpread');
  Collectable.prototype.mapToDictionary = require('./methods/mapToDictionary');
  Collectable.prototype.mapInto = require('./methods/mapInto');
  Collectable.prototype.mapToGroups = require('./methods/mapToGroups');
  Collectable.prototype.mapWithKeys = require('./methods/mapWithKeys');
  Collectable.prototype.max = require('./methods/max');
  Collectable.prototype.median = require('./methods/median');
  Collectable.prototype.merge = require('./methods/merge');
  Collectable.prototype.mergeRecursive = require('./methods/mergeRecursive');
  Collectable.prototype.min = require('./methods/min');
  Collectable.prototype.mode = require('./methods/mode');
  Collectable.prototype.nth = require('./methods/nth');
  Collectable.prototype.only = require('./methods/only');
  Collectable.prototype.pad = require('./methods/pad');
  Collectable.prototype.partition = require('./methods/partition');
  Collectable.prototype.pipe = require('./methods/pipe');
  Collectable.prototype.pluck = require('./methods/pluck');
  Collectable.prototype.pop = require('./methods/pop');
  Collectable.prototype.prepend = require('./methods/prepend');
  Collectable.prototype.pull = require('./methods/pull');
  Collectable.prototype.push = require('./methods/push');
  Collectable.prototype.put = require('./methods/put');
  Collectable.prototype.random = require('./methods/random');
  Collectable.prototype.reduce = require('./methods/reduce');
  Collectable.prototype.reject = require('./methods/reject');
  Collectable.prototype.replace = require('./methods/replace');
  Collectable.prototype.replaceRecursive = require('./methods/replaceRecursive');
  Collectable.prototype.reverse = require('./methods/reverse');
  Collectable.prototype.search = require('./methods/search');
  Collectable.prototype.shift = require('./methods/shift');
  Collectable.prototype.shuffle = require('./methods/shuffle');
  Collectable.prototype.skip = require('./methods/skip');
  Collectable.prototype.slice = require('./methods/slice');
  Collectable.prototype.some = require('./methods/contains');
  Collectable.prototype.sort = require('./methods/sort');
  Collectable.prototype.sortBy = require('./methods/sortBy');
  Collectable.prototype.sortByDesc = require('./methods/sortByDesc');
  Collectable.prototype.sortKeys = require('./methods/sortKeys');
  Collectable.prototype.sortKeysDesc = require('./methods/sortKeysDesc');
  Collectable.prototype.splice = require('./methods/splice');
  Collectable.prototype.split = require('./methods/split');
  Collectable.prototype.sum = require('./methods/sum');
  Collectable.prototype.take = require('./methods/take');
  Collectable.prototype.tap = require('./methods/tap');
  Collectable.prototype.times = require('./methods/times');
  Collectable.prototype.toArray = require('./methods/toArray');
  Collectable.prototype.toJson = require('./methods/toJson');
  Collectable.prototype.transform = require('./methods/transform');
  Collectable.prototype.unless = require('./methods/unless');
  Collectable.prototype.unlessEmpty = require('./methods/whenNotEmpty');
  Collectable.prototype.unlessNotEmpty = require('./methods/whenEmpty');
  Collectable.prototype.union = require('./methods/union');
  Collectable.prototype.unique = require('./methods/unique');
  Collectable.prototype.unwrap = require('./methods/unwrap');
  Collectable.prototype.values = require('./methods/values');
  Collectable.prototype.when = require('./methods/when');
  Collectable.prototype.whenEmpty = require('./methods/whenEmpty');
  Collectable.prototype.whenNotEmpty = require('./methods/whenNotEmpty');
  Collectable.prototype.where = require('./methods/where');
  Collectable.prototype.whereBetween = require('./methods/whereBetween');
  Collectable.prototype.whereIn = require('./methods/whereIn');
  Collectable.prototype.whereInstanceOf = require('./methods/whereInstanceOf');
  Collectable.prototype.whereNotBetween = require('./methods/whereNotBetween');
  Collectable.prototype.whereNotIn = require('./methods/whereNotIn');
  Collectable.prototype.wrap = require('./methods/wrap');
  Collectable.prototype.zip = require('./methods/zip');
  return items => new Collectable(items); ////////////////////////////////////////
});