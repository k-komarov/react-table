"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var HeaderCell = (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderCell.prototype.render = function () {
        return (React.createElement("div", null, this.props.children));
    };
    return HeaderCell;
}(React.Component));
exports.HeaderCell = HeaderCell;
//# sourceMappingURL=HeaderCell.js.map