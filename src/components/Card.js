import React from "react";

class Card extends React.PureComponent {
  render() {
    const data = this.props.data;
    return (
      <div>
        <h1>{data.name}</h1>
        <img src={data.thumbnail} alt={data.name}/>
        <h2>Age: {data.age}</h2>
        {data.friends.length > 0 ? (
          <div>
            <div className="title">Friends</div>
            <ul>
              {data.friends.map((friend, index) => {
                return <li key={index}>{friend}</li>;
              })}
            </ul>
          </div>
        ) : (
          <div className="title">No friends</div>
        )}
        {data.professions.length > 0 ? (
          <div>
            <div className="title">Professions</div>
            <ul>
              {data.professions.map((profession, index) => {
                return <li key={index}>{profession}</li>;
              })}
            </ul>
          </div>
        ) : (
          <div className="title">Unemployed</div>
        )}
      </div>
    );
  }
}

export default Card;
