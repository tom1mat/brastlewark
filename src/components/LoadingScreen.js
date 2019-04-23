import React from 'react';
import { connect } from 'react-redux';

class LoadingScreen extends React.PureComponent{
    async componentDidMount(){
        let data = await fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
        data = await data.json();
        this.props.loadData(data.Brastlewark);
        const professions = [];
        
        Object.values(data)[0].forEach((item) =>{
            if(item.professions){
                item.professions.forEach((eachProff)=>{
                    if(!professions[eachProff])
                        professions[eachProff] = {profession: eachProff, workers: 1};
                    else
                        professions[eachProff].workers++;
                });
            }
        });
        this.props.loadProfessions(professions);
        this.props.setAppState("LOADED");
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
        loadProfessions: (data) =>{
            dispatch({
                type: "LOAD_PROFESSIONS",
                payload: data
            });
        },
        setAppState: (appState) =>{
            dispatch({
                type: "SET_APP_STATE",
                payload: appState
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