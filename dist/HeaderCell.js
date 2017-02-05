"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var SortingDirection_1 = require("./SortingDirection");
var HeaderCell = (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderCell.prototype.render = function () {
        return (React.createElement("div", null,
            this.props.children,
            this.props.sortDirection === null || this.props.sortDirection === SortingDirection_1.SortingDirection.NO
                ? null
                : (this.props.sortDirection === SortingDirection_1.SortingDirection.DESC
                    ? React.createElement("span", null, "\u2193")
                    : React.createElement("span", null, "\u2191"))));
    };
    return HeaderCell;
}(React.Component));
exports.HeaderCell = HeaderCell;
//# sourceMappingURL=HeaderCell.js.map