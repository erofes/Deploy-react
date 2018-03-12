import React from 'react';
import ReactDOM from 'react-dom';

import './HomeList.less';

class HomeList extends React.Component {
    render() {
        return <div className="HomeList">
            <table>
                <tbody><tr>
                    <th>Header</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>TaskToDo1</td>
                    <td>Low</td>
                    <td>Undone</td>
                    <td>18/03/2018</td>
                </tr></tbody>
            </table>
        </div>;
    }
}

export default HomeList;