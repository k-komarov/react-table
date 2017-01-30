import * as React from "react";
import "./ContextMenu.less";

export interface ContextMenuProps {
    children?: React.ReactElement<ContextMenuItemProps>[];
    data?: any;
}

export class ContextMenu extends React.Component<ContextMenuProps, any> {

    constructor(props: ContextMenuProps, context: any) {
        super(props, context);
    }

    render() {
        const items = React.Children.map(this.props.children, (child, index) => {
            return <li key={index}>
                {child}
            </li>;
        });
        return (
            <ul className="ContextMenu">
                {items}
            </ul>
        );
    }
}

export interface ContextMenuItemProps {
    className?: string;
    onClick: (e: MouseEvent) => void;
    data?: any;
}

export class ContextMenuItem extends React.Component<ContextMenuItemProps, any> {
    render() {
        return (
            <div className={"ContextMenuItem " + this.props.className}
                 onClick={this.props.onClick.bind(this, this.props.data)}>
                {this.props.children}
            </div>
        );
    }
}