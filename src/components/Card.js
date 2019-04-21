import React from 'react';

class Card extends React.PureComponent{
    render(){
        return(
            <div className="col-lg-3">
                <h1>{this.props.data.name}</h1>
                <img src={this.props.data.thumbnail}></img>
            </div>
        );
    }
}

export default Card;