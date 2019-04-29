import React from "react";
import { Avatar } from "antd";
import { Link } from 'react-router-dom';
class Card extends React.PureComponent {
  render() {
    const data = this.props.data;
    const friendsLength = data.friends.length;
    const professionsLength = data.professions.length;

    let fontSize = ""
    if(friendsLength + professionsLength > 8)
      fontSize = 14
    else
      fontSize = 17

    const link = data.name.replace(" ","-");
    
    return (
      <div className="item">
        <Link to={link}><h1>{data.name}</h1></Link>
        <Avatar src={data.thumbnail} size={150} className="center-auto"/>
        <h2 className="age">Age: {data.age}</h2>
        <h2>Weight {data.weight}</h2>
        <h2>Height {data.height}</h2>
        <h2>Hair color {data.hair_color} <span className="dot" style={{backgroundColor: data.hair_color}}></span></h2>
        {friendsLength > 0 ? (
          <div style={{fontSize}}>
            <div className="title">Friends</div>
            <ul>
              {data.friends.map((friend, index) => {
                return <li key={index}><Link to={friend.replace(" ","-")}>{friend}</Link></li>;
              })}
            </ul>
          </div>
        ) : (
          <div className="title">No friends</div>
        )}
        {professionsLength > 0 ? (
          <div style={{fontSize}}>
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
