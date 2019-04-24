import React from "react";

class Card extends React.PureComponent {
  render() {
    const data = this.props.data;
    return (
      <div>
        <h1>{data.name}</h1>
        <img src={data.thumbnail} />
        <h2>Age: {data.age}</h2>

        {data.friends.length > 0 ? (
          <ul>
            {data.friends.map((friend, index) => {
              return <li key={index}>{friend}</li>;
            })}
          </ul>
        ) : (
          "No friends"
        )}
      </div>
    );
  }
}

export default Card;
