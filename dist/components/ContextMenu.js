"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
require("./ContextMenu.less");
var ContextMenu = (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu(props, context) {
        return _super.call(this, props, context) || this;
    }
    ContextMenu.prototype.render = function () {
        var items = React.Children.map(this.props.children, function (child, index) {
            return React.createElement("li", { key: index }, child);
        });
        return (React.createElement("ul", { className: "ContextMenu" }, items));
    };
    return ContextMenu;
}(React.Component));
exports.ContextMenu = ContextMenu;
var ContextMenuItem = (function (_super) {
    __extends(ContextMenuItem, _super);
    function ContextMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenuItem.prototype.render = function () {
        return (React.createElement("div", { className: "ContextMenuItem " + this.props.className, onClick: this.props.onClick.bind(this, this.props.data) }, this.props.children));
    };
    return ContextMenuItem;
}(React.Component));
exports.ContextMenuItem = ContextMenuItem;
//# sourceMappingURL=ContextMenu.js.map