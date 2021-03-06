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
                    if(!professions[eachProff.replace(/\s/g, '')])
                        professions[eachProff.replace(/\s/g, '')] = {profession: eachProff, workersCount: 1};
                    else
                        professions[eachProff.replace(/\s/g, '')].workersCount++;
                });
            }
        });
        this.props.loadProfessions(professions);
        this.props.setAppState("READY");
    }
    render(){
        return(
            <div>
                <h1>LOADING!</h1>
                <img src="loading.gif" id="loadingGif" alt="Loading" width="240" height="240"></img>
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