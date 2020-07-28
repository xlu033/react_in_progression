import React, { Component } from 'react';


export class TodoRow extends Component {
    render = () =>
        <tr>
            <td>{ this.props.item.action}</td>
            <td>
                <input type = "checkbox" checked = {this.props.item.done}
                       onChange={ () => this.props.callback(this.props.item)}
                />
            </td>
            <td>
                <button class = "delete" className="btn btn-light btn-sm p-1 m-2">
                    Delete
                </button>
            </td>
        </tr>
}