/* eslint-disable default-case */
import React from "react";
import Card from "./Card";

import { Col, Row } from "antd";
class CardList extends React.PureComponent {
  state = {
    lg: 6,
    md: 8,
    sm: 12,
    xs: 24
  }
  render() {
    
      if (this.props.items.length > 0) {
      
      return (
        <Row gutter={15} type="flex" justify="center">
          {this.props.items.map(elem => {
              return (<Col
                        lg={this.state.lg}
                        md={this.state.md}
                        sm={this.state.sm}
                        xs={this.state.xs}
                        key={elem.id}
                      >
                        <Card data={elem} />
                      </Col>);
              //return (<div className={className + " item text-center"} key={elem.id}><Card data={elem} /></div>);
          })}
        </Row>
      );
    } else {
      return (<div className="text-center">
        No gnomes found
      </div>);
    }
  }
}

export default CardList;
