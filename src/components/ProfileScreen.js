import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";

//Style imports
import { Layout, Input, Radio, Pagination, Col, Row, Button } from 'antd';
const { Header, Content } = Layout;

class ProfileScreen extends React.PureComponent {
    state = {
        screenStatus: "LOADING",
        name: ""
    };

    searchItem = (arr, name) =>{
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                this.setState({ data: arr[i] });
                this.setState({ screenStatus: "SUCCESS" })
                return;
            }
        }
        this.setState({ screenStatus: "NOT_FOUND" })
    }

    componentWillReceiveProps(props) {
        if (props.items && this.state.screenStatus !== "SUCCESS") {
            this.searchItem(props.items, this.state.name);
        }
        if(props.location && this.props.items.length >0){
            const name = this.formatName(props.location.pathname);
            if(name){
                this.searchItem(this.props.items, name);
            }else {
                this.setState({ screenStatus: "NOT_FOUND" })
            }
        }
    }

    toUpperCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatName = (name) =>{
        const arr = name.slice(1).split("-");
        if(arr[0] && arr[1])
            return this.toUpperCase(arr[0]) + " " + this.toUpperCase(arr[1]);
        else
            return false;
    }

    componentDidMount() {
        const name = this.formatName(this.props.location.pathname);
        if (name) {
            this.setState({ name });
        } else {
            this.setState({ screenStatus: "NOT_FOUND" })
        }
        if(this.props.items){
            this.searchItem(this.props.items, name);
        }
    }

    handleGoBack = () =>{
        this.props.history.push('/');
    }
    render() { 
        if (this.props.appState === "LOADING") return <LoadingScreen />;
        else {
            let data
            if (this.state.screenStatus === "SUCCESS")
                data = this.state.data;
        
            return (
                <Layout>
                    <Layout>
                        <Header style={{ background: '#fff', height: "auto" }}>
                            <Row>
                                <Col xl={2} lg={2} sm={2} xs={2} style={{ textAlign: "left"}}>
                                    <Button onClick={this.handleGoBack} type="primary" shape="circle" icon="caret-left" size="large" />
                                </Col>
                                {this.state.screenStatus === "SUCCESS" ? 
                                    <Col xl={20} lg={20} sm={20} xs={20}><h1 className="profileName">{data.name}</h1></Col> : null}
                            </Row>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            {this.state.screenStatus !== "SUCCESS" ? <h1>Not found</h1> :(
                                <Row gutter={25}>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <img src={data.thumbnail} alt={data.name} className="imgProfile"></img>
                                        <h2>Hair color {data.hair_color} <span className="dot" style={{backgroundColor: data.hair_color}}></span></h2>
                                    </Col>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <Col xl={8} lg={8} md={8} sm={24} xs={24} className="sectionProfile">
                                            <h2>Age: {data.age}</h2>
                                            <h2>Weight {data.weight}</h2>
                                            <h2>Height {data.height}</h2>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={24} xs={24} className="sectionProfile">
                                            {data.friends.length > 0 ? (
                                            <div>
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
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={24} xs={24} className="sectionProfile">
                                            {data.professions.length > 0 ? (
                                            <div>
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
                                        </Col>
                                    </Col>
                                </Row> 
                            )}             
                        </Content>
                    </Layout>
                </Layout>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isReady: state.isReady,
        appState: state.appState,
        items: state.items
    };
};

export default connect(mapStateToProps)(ProfileScreen);
