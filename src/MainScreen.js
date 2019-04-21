import React from 'react';
import { connect } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import CardList from './components/CardList';

class MainScreen extends React.PureComponent{
    render(){
        //console.log(this.props.isReady);
        return(
            <div>
                {this.props.isReady ? <CardList /> : <LoadingScreen/>}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isReady: state.isReady
    };
}

export default connect(mapStateToProps)(MainScreen);
