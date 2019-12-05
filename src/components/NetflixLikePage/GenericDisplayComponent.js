import React from 'react';
import './styles/genericdisplaycomponent.css';

class GenericDisplayComponent extends React.Component {
    //Each card will be composed of a title on top, an image in between
    //and a button(which will be add or remove bitton based on the type of component(Mylist or Recommendation)).
    //The Onlick function(to add or remove) will also be called accordingly depending on the type of component(Mylist or Recommendation).
    render() {
        const displayElements = [];
        this.props.displayData.forEach(element => 
            {
                displayElements.push(
                    <div className="card">
                        <span>{element.title}</span>
                        <img src={element.img}></img>
                        <button onClick={() => this.props.onClickFunction(element.id)}>{this.props.rowDescription==="My Lists"?"Remove":"Add"}</button>
                    </div>
                ); 
            }
        );

        return (
            <>
                <div className="rowDescription">{this.props.rowDescription}</div>
                {displayElements}
            </>
        )
    }
}

export default GenericDisplayComponent