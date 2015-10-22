(function() {

  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var Tracker = Package.tracker.Tracker;
  var Deps = Package.tracker.Deps;

  /* Package-scope variables */
  var ReactiveArray;

  (function() {

    (function() {

      var
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
          for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
          }

          function ctor() {
            this.constructor = child;
          }
          ctor.prototype = parent.prototype;
          child.prototype = new ctor();
          child.__super__ = parent.prototype;
          return child;
        };

      ReactiveArray = (function(_super) {
        var isArray;

        __extends(ReactiveArray, _super);

        isArray = function(obj) {
          return obj instanceof Array;
        };

        function ReactiveArray(p1, p2) {
          var dep, item, pause, _i, _len;
          dep = null;
          pause = false;
          this.changed = function() {
            if (dep && !pause) {
              return dep.changed();
            }
          };
          this.depend = function() {
            return dep.depend();
          };
          if (isArray(p1)) {
            for (_i = 0, _len = p1.length; _i < _len; _i++) {
              item = p1[_i];
              this.push(item);
            }
            dep = p2;
          } else {
            dep = p1;
          }
          if (!(dep instanceof Tracker.Dependency)) {
            dep = new Tracker.Dependency();
          }
          this.pause = function() {
            return pause = true;
          };
          this.resume = function() {
            pause = false;
            return this.changed();
          };
        }

        ReactiveArray.prototype.array = function() {
          this.depend();
          return Array.prototype.slice.call(this);
        };

        ReactiveArray.prototype.list = function() {
          this.depend();
          return this;
        };

        ReactiveArray.prototype.depend = function() {
          this.depend();
          return this;
        };

        ReactiveArray.prototype.push = function() {
          var item;
          item = ReactiveArray.__super__.push.apply(this, arguments);
          this.changed();
          return item;
        };

        ReactiveArray.prototype.unshift = function() {
          var item;
          item = ReactiveArray.__super__.unshift.apply(this, arguments);
          this.changed();
          return item;
        };

        ReactiveArray.prototype.pop = function() {
          var item;
          item = ReactiveArray.__super__.pop.apply(this, arguments);
          this.changed();
          return item;
        };

        ReactiveArray.prototype.shift = function() {
          var item;
          item = ReactiveArray.__super__.shift.apply(this, arguments);
          this.changed();
          return item;
        };

        ReactiveArray.prototype.remove = function(valueOrPredicate) {
          var i, predicate, removedValues, underlyingArray, value;
          underlyingArray = this;
          removedValues = [];
          predicate = typeof valueOrPredicate === "function" ? valueOrPredicate : function(value) {
            return value === valueOrPredicate;
          };
          i = 0;
          while (i < underlyingArray.length) {
            value = underlyingArray[i];
            if (predicate(value)) {
              removedValues.push(value);
              underlyingArray.splice(i, 1);
              i--;
            }
            i++;
          }
          if (removedValues.length) {
            this.changed();
          }
          return removedValues;
        };

        ReactiveArray.prototype.clear = function() {
          while (this.length) {
            this.pop();
          }
          this.changed();
          return this;
        };

        ReactiveArray.prototype.concat = function() {
          var a, ret, _i, _len;
          ret = this.array();
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            a = arguments[_i];
            if (a instanceof ReactiveArray) {
              ret = ret.concat(a.array());
            } else {
              ret = ret.concat(a);
            }
          }
          return new ReactiveArray(ret);
        };

        ReactiveArray.prototype.indexOf = function() {
          this.depend();
          return ReactiveArray.__super__.indexOf.apply(this, arguments);
        };

        ReactiveArray.prototype.join = function() {
          this.depend();
          return ReactiveArray.__super__.join.apply(this, arguments);
        };

        ReactiveArray.prototype.lastIndexOf = function() {
          this.depend();
          return ReactiveArray.__super__.lastIndexOf.apply(this, arguments);
        };

        ReactiveArray.prototype.reverse = function() {
          ReactiveArray.__super__.reverse.apply(this, arguments);
          this.changed();
          return this;
        };

        ReactiveArray.prototype.sort = function() {
          ReactiveArray.__super__.sort.apply(this, arguments);
          this.changed();
          return this;
        };

        ReactiveArray.prototype.splice = function() {
          var ret;
          ret = ReactiveArray.__super__.splice.apply(this, arguments);
          this.changed();
          return ret;
        };

        ReactiveArray.prototype.set = function(list) {
          // clear
          this.clear();
          for (l in list) {
            this.push(list[l]);
          }
        };

        return ReactiveArray;

      })(Array);


    }).call(this);

  }).call(this);


  /* Exports */
  if (typeof Package === 'undefined') Package = {};
  Package['reactive-array'] = {
    ReactiveArray: ReactiveArray
  };

})();
