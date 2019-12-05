import React from 'react';

class ListOfTitles extends React.Component {
    render() {
        return (
            <div className="rowDescription">
                {this.props.listOfTitles.join(", ")}
            </div>
        )
    }
}

export default ListOfTitles