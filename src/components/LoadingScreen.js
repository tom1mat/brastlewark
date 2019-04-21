import React from 'react';
import { connect } from 'react-redux';

class LoadingScreen extends React.PureComponent{
    async componentDidMount(){
        let data = await fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
        data = await data.json();
        this.props.loadData(data);
        this.props.setIsready();

        // fetch(url).then((data)=>{
            //     dispatch({
            //         type: "LOAD_DATA",
            //         payload: data,
            //     });
            // });
    }
    render(){
        return(
            <div>
                <h1>LOADING!</h1>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadData: (data) =>{
            dispatch({
                type: "LOAD_DATA",
                payload: data
            });
        },
        setIsready: () =>{
            dispatch({
                type: "SET_ISREADY",
                payload: true
            })
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);