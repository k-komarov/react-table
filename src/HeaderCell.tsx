import * as React from "react";
import {SortingDirection} from "./SortingDirection";

export interface HeaderCellProps {
    sortDirection?: SortingDirection
}
export class HeaderCell extends React.Component<HeaderCellProps, any> {
    render() {
        return (
            <div>
                {this.props.children}
                {
                    this.props.sortDirection === null || this.props.sortDirection === SortingDirection.NO
                        ? null
                        : (
                            this.props.sortDirection === SortingDirection.DESC
                                ? <span>&darr;</span>
                                : <span>&uarr;</span>
                        )
                }
            </div>
        );
    }
}