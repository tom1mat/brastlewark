import React, { View } from "react";
import Card from "./Card";
import "../styles/styles.css";
class CardList extends React.PureComponent {
  render() {
    const itemsLength = this.props.items.length;
    let className = "col-lg-4 text-center";
    
    if(itemsLength>0){
      switch(itemsLength){
        case 1:
          className+=" offset-lg-4 m-auto";
        break;
        case 2:
          className+=" offset-lg-2 m-auto";
        break;
      }
      
      return (
          this.props.items.map(elem => {
          return(<div className={className} key={elem.id}><Card data={elem} /></div>);
          })
      );
    }else{
      return (<div>
        No hay items
      </div>);
    }
  }
}

export default CardList;
