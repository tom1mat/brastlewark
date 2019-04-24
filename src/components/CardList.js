import React, { View } from "react";
import Card from "./Card";
class CardList extends React.PureComponent {
  render() {
    const itemsLength = this.props.items.length;
    let col = "";
    switch(this.props.rowCount){
      case 12: col = 1; break;
      case 6: col  = 2; break;
      case 4: col  = 3; break;
      case 3: col  = 4; break;
      case 2: col  = 6; break;
      case 1: col  = 12;break;
      default: col = 4;
    }

    let className = "col-lg-"+col;

    if(itemsLength>0){
      switch(itemsLength){
        case 1:
          className ="col-lg-4 offset-lg-4";
        break;
        case 2:
          className ="col-lg-4 offset-lg-2 mlr-auto";
        break;
        case 3:
          className ="col-lg-4 mlr-auto";
        break;
      }
      
      return (
          this.props.items.map(elem => {
          return(<div className={className+" item text-center"} key={elem.id}><Card data={elem} /></div>);
          })
      );
    }else{
      return (<div class="text-center">
        No items
      </div>);
    }
  }
}

export default CardList;
