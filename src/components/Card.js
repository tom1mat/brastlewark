import React from 'react';

class Card extends React.PureComponent{
    render(){
        const data = this.props.data;
        return(
            <div className="item">
                <h1>{data.name}</h1>
                <img src={data.thumbnail}></img>
                <h2>Age: {data.age}</h2>
                <ul>
                    {data.friends.map((friend, index) =>{
                        return <li key={index}>{friend}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Card;