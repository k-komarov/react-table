/// <reference types="react" />
import * as React from "react";
import { SortingDirection } from "./SortingDirection";
export interface HeaderCellProps {
    sortDirection?: SortingDirection;
}
export declare class HeaderCell extends React.Component<HeaderCellProps, any> {
    render(): JSX.JSXElement;
}
