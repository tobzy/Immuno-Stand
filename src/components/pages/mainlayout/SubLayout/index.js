/**
 * Created by Tobechukwu.Onuegbu on 2/19/2018.
 */
import React from 'react';
import {Layout, Menu, Icon} from 'antd';

import {history} from '../../../../App'
import Logo from '../../../../assets/img/dropper_dark';


import Overview from './Overview'
import RegisterAChild from './RegisterAChild'
import ViewAll from './ViewAll'
import DashboardIcon from '../../../../assets/img/dashboard'
import TransferIcon from '../../../../assets/img/transfer'
import FundIcon from '../../../../assets/img/fundLogo'
import {logoutUser} from '../../../../actions/auth.js';
import {GET_INVESTMENTS_DATA} from '../../../../actions/types';

import {connect} from 'react-redux';
import {Button, Popover} from 'antd'

import {Route, Switch, Redirect} from 'react-router-dom';

const {Content, Sider, Header, Footer} = Layout;


class SubLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterDropdownDisplay: false
        }
        this.filterDropdownDisplay = this.filterDropdownDisplay.bind(this)

    }

    componentDidMount() {
        if (!this.props.authenticated) {
            history.replace('/')
        }
    }

    goToStartupPage = (obj) => {
        if (obj.key === '1') {
            history.push(`/app/overview`)
        }
        if (obj.key === '2') {
            history.push(`/app/register-a-child`)
        }
        if (obj.key === '3') {
            history.push(`/app/view-all`)
        }

    }

    filterDropdownDisplay(e) {
        e.stopPropagation();
        this.setState({
            filterDropdownDisplay: !this.state.filterDropdownDisplay
        })
    }

    hideDropdown() {
        this.setState({
            filterDropdownDisplay: false
        })
    }

    getSelectedKeys = () => {
        if (this.props.location.pathname === '/app/overview') return '1'
        if (this.props.location.pathname === '/app/register-a-child') return '2'
        if (this.props.location.pathname === '/app/view-all') return '3'
    }

    render() {
        const content = (
            <div onClick={this.props.logoutUser}>
                <p className="pointer">Sign Out</p>
            </div>
        );

        return (
            <div className="admin-page" onClick={this.hideDropdown.bind(this)}>
                <div className="container">
                    <Layout>
                        <Header className="header">
                            <div style={{width: '60px', display:'inline-block',float:'left'}}>
                                <Logo/>
                            </div>
                            <Popover content={content} title={null} trigger="click" placement="bottomRight">
                                <Button>{this.props.user.first_name} <Icon type="down" /> </Button>
                            </Popover>
                        </Header>
                        <Content>
                            <Layout style={{background: '#fff'}}>
                                <Sider width={100} style={{background: '#fff',borderRight: "1px solid #ededed"}}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        style={{
                                            // background:'white',
                                            // paddingTop:'30px',
                                            // borderRight:'none',
                                            marginTop:'40px',
                                            minHeight: '100vh'
                                        }}
                                        onSelect={this.goToStartupPage}
                                        selectedKeys={
                                            [this.getSelectedKeys()]
                                        }
                                    >
                                        <Menu.Item key="1">
                                            <DashboardIcon />
                                            <span className="nav-text">Overview</span>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <TransferIcon />
                                            <span className="nav-text">Register</span>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <FundIcon />
                                            <span className="nav-text">View All</span>
                                        </Menu.Item>
                                    </Menu>
                                </Sider>
                                <Content style={{padding: '40px 24px', minHeight: 280, background: "#f9f9f9"}}>
                                    <div style={{padding: '0px 0px 0 24px'}}>
                                        <Switch>
                                            <Route path="/app/overview" component={Overview} exact/>
                                            <Redirect strict from={"/app/overview/"} to={"/app/overview"}/>
                                            <Route path="/app/register-a-child" component={RegisterAChild} exact/>
                                            <Redirect strict from={"/app/register-a-child/"} to={"/app/register-a-child"} />
                                            <Route path="/app/view-all" component={ViewAll} exact/>
                                            <Redirect strict from={"/app/view-all/"} to={"/app/view-all"} />

                                            <Redirect strict from={"/app"} to={"/app/overview"}/>
                                        </Switch>
                                    </div>
                                </Content>
                            </Layout>
                        </Content>
                        {/*<Footer style={{textAlign: 'center'}}>*/}
                            {/*Ant Design ©2016 Created by Ant UED*/}
                        {/*</Footer>*/}
                    </Layout>
                </div>

            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        investments: state.investments.data,
        user: state.auth.user
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTheInvestments: () => dispatch({type: GET_INVESTMENTS_DATA}),
        logoutUser: () => dispatch(logoutUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubLayout);

