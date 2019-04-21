import React, { View } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import '../styles/styles.css';
class CardList extends React.PureComponent{
    
    state={
        itemsRaw:[]
    }
    componentDidMount(){
        this.setState({items: this.getRawItems()});
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <input id="search" type="text" placeholder="Search" onKeyUp={this.handleKeyPress}/>
                </div>
                {this.state.items}
            </div>
        )
    }

    handleKeyPress = (event) =>{
        this.filterItems(event.target.value);
        console.log(event.target.value);
    }
    getRawItems = () =>{
        return this.props.data.Brastlewark.map((elem)=>{
            return <Card data={elem} key={elem.id}></Card>
        });
    }
    filterItems = (str) =>{
        if(str.length>0){
            this.setState(
                {
                    items: this.getRawItems()
                    .filter((item) => item.props.data.name
                    .toLowerCase()
                    .includes(str.toLowerCase()))
                }
            );
        }else{
            this.setState({items: this.getRawItems()});
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(CardList);