/* eslint-disable default-case */
import React from "react";
import Card from "./Card";
class CardList extends React.PureComponent {
  render() {
    const itemsLength = this.props.items.length;
    let col = "";
    switch (this.props.rowCount) {
      case 12: col = 1; break;
      case 6: col = 2; break;
      case 4: col = 3; break;
      case 3: col = 4; break;
      case 2: col = 6; break;
      case 1: col = 12; break;
      default: col = 4;
    }

    let className = `imgSmall col-xl-${col} col-lg-${col} col-md-${col} col-sm-6 col-12`;

    if (itemsLength > 0) {
      switch (itemsLength) {
        case 1:
          className = "col-xl-4 col-lg-4 col-md-4 col-sm-8 offset-xl-4 offset-lg-4 offset-md-4 offset-sm-2  imgBig";
          break;
        case 2:
          className = "col-xl-4 col-lg-4 col-md-4 offset-xl-2 offset-lg-2 offset-md-2 mlr-auto imgSmall";
          break;
        case 3:
          className = "col-xl-4 col-lg-4 col-md-4 col-sm-8 offset-sm-2 mlr-auto imgSmall";
          break;
      }
      return (
        <div className="row">
          {this.props.items.map(elem => {
            return (<div className={className + " item text-center"} key={elem.id}><Card data={elem} /></div>);
          })}
        </div>
      );
    } else {
      return (<div className="text-center">
        No items
      </div>);
    }
  }
}

export default CardList;
