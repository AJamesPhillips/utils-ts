"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var SubjectBase = /** @class */ (function () {
    function SubjectBase() {
        this.observers = [];
    }
    SubjectBase.prototype.add_observer = function (observer) {
        this.observers.push(observer);
    };
    SubjectBase.prototype.remove_observer = function (observer) {
        // TODO can we remove the cast?
        this.observers = _.reject(this.observers, function (o) { return o === observer; });
    };
    SubjectBase.prototype.inform_observers = function (event_result) {
        this.observers.map(function (observer) { return observer.event(event_result); });
    };
    SubjectBase.prototype.destroy = function () {
        // Remove references to listeners incase they also have a reference
        // to this instance (and therefore a circular reference).  Maybe
        // important for helping GC.
        this.observers = [];
    };
    return SubjectBase;
}());
exports.SubjectBase = SubjectBase;
//# sourceMappingURL=events.js.map