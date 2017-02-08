/// <reference types="react" />
import * as React from "react";
import "./ContextMenu.less";
export interface ContextMenuProps {
    children?: React.ReactElement<ContextMenuItemProps>[];
    data?: any;
}
export declare class ContextMenu extends React.Component<ContextMenuProps, any> {
    constructor(props: ContextMenuProps, context: any);
    render(): JSX.JSXElement;
}
export interface ContextMenuItemProps {
    className?: string;
    onClick: (e: MouseEvent) => void;
    data?: any;
}
export declare class ContextMenuItem extends React.Component<ContextMenuItemProps, any> {
    render(): JSX.JSXElement;
}
