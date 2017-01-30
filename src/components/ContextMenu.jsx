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
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            active: false
        };
        return _this;
    }
    ContextMenu.prototype.render = function () {
        if (!this.state.active)
            return null;
        var items = React.Children.map(this.props.children, function (child, index) {
            return <li key={index}>{child}</li>;
        });
        return (<ul className="ContextMenu">
                {items}
            </ul>);
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
        return (<div className={"ContextMenuItem " + this.props.className}>{this.props.children}</div>);
    };
    return ContextMenuItem;
}(React.Component));
exports.ContextMenuItem = ContextMenuItem;
