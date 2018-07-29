import React from 'react';
import {connect} from 'react-redux';
import {authUser} from '../../../actions/auth.js';
import {history} from '../../../App.js';
import '../../../assets/css/login.css';
import LaddaButton, {SLIDE_UP} from 'react-ladda';
import {showInfoBox} from '../../sharedComponents/infoBox/actions'
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import '../../../assets/css/login.css';
import {message} from 'antd'
import Logo from '../../../assets/img/dropper';
import Web from '../../../assets/img/web';
import Channel from '../../../assets/img/ussd.png';
import uPortLogo from '../../../assets/img/uport.png';
import {axiosClient} from '../../../tools/axiosClient.js';
import {postLogin} from '../../../config/url';
import {Connect, SimpleSigner} from 'uport-connect'

var uportconnect = window.uportconnect
var uport = new uportconnect.Connect('Immuno-Stand', {
    clientId: '2ojb7BCjrCjLe7qHDKdxyL6UMRRhqP5ks5B',
    network: 'rinkeby',
    // signer: SimpleSigner('91f6c7a40fc3496bfb6ec4a73653a4dec8dcf2ea21410fcfdc80273a0ae65a09')
    // signer: SimpleSigner('SIGNING KEY')
})

// const uport = new Connect('0x499f4f0a', {
//     clientId: '2ojb7BCjrCjLe7qHDKdxyL6UMRRhqP5ks5B',
//     network: 'rinkeby',
//     signer: SimpleSigner('91f6c7a40fc3496bfb6ec4a73653a4dec8dcf2ea21410fcfdc80273a0ae65a09')
// })

// const uport = new Connect('Tobechukwu Onuegbu\'s new app', {
//     clientId: '2ohWZJoREybk3UCT85Zdr6RboCzwuVTUWoe',
//     network: 'kovan',
//     signer: SimpleSigner('7b260186d39ebb72bc864d629c94137768a4fa67d1bc89087f6c7104ab711142')
// })


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitStatus: null,
            checkboxActive: false,
            email_error: '',
            password_error: '',
            web3: null
        }
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        if (this.props.authenticated) {
            history.replace('/app')
        }
    }

    signInWithUport = (e) => {
        e.preventDefault();
        this.setState({
            submitStatus: 'FETCHING'
        }, () => {
            // Request credentials to login
            uport.requestCredentials({
                // We want this if we want to recieve credentials
                // requested: ['name', 'avatar', 'phone', 'country'],
                // notifications: true
            })
                .then((credentials) => {
                    // Do something
                    this.login(credentials);
                }).catch((e) => {
                this.setSubmitStatusToCompleted();
                console.log(e)
            })
        })


    }

    login = (creds) => {
        let params = {
            name: creds.name,
            location: '',
            address: creds.address,
        }
        axiosClient.post(postLogin, params
        )
            .then(response => {
                console.log(response)
                let {name,location,children,id} = response.data
                let user = {
                    email: '',
                    first_name: name,
                    last_name: '',
                    transactions: '',
                    address: location,
                    id,
                    children
                }
                window.sessionStorage.setItem('hackathon_api_user', JSON.stringify(user))
                this.props.authUser(user);
                history.push('/app')
                message.success("Successfully logged in", 2)
                this.setSubmitStatusToCompleted();
            })
            .catch((error) => {
                console.log(error)
                message.error("Couldn't register this account", 1)
                this.setSubmitStatusToCompleted();
            });
    }

    setSubmitStatusToCompleted = () => {
        this.setState({
            submitStatus: 'COMPLETED'
        })
        this.props.hideLoading();
    }

    render() {
        return (
            <div className="login-page">
                <div className="welcome-block">


                    <div style={{width: '60px'}}>
                        <Logo/>
                    </div>
                    <h1>Welcome To Immuno Stand</h1>
                    <p>Immuno stand takes away the responsibility of keeping track of every registered child's medical history. Connected through a decentralized network, it provides quick access to each child's record anywhere he/she is taken to, serving as a healthy option of keeping our society green and paperless. Progressing through an age with faster and reliable access to information, the elimination of child death due to simple incompetence in record keeping is a priority, and this is a problem Immuno stand is here to solve!</p>

                    <h1>Available Channels</h1>
                    <div style={{width: '100%', display:'flex'}}>
                        <div style={{width:'100px'}}>
                            <h4>Web</h4>
                            <Web/>
                        </div>
                        <div style={{width:'100px'}}>
                        <h4>USSD</h4>
                            <img src={Channel} width={100}/>
                        </div>
                    </div>
                </div>
                <div className="login-section">
                    <form>
                        <div style={{marginTop: '20px', textAlign: 'right'}}>
                            <img src={uPortLogo} width={50} style={{display:"block", margin:'auto', marginBottom:'20px'}} />
                            <LaddaButton loading={this.state.submitStatus === 'FETCHING'}
                                         onClick={this.signInWithUport}
                                // data-style={SLIDE_UP}
                                // id="submit"
                                // data-spinner-size={30}
                                // data-spinner-color="#fff"
                                // data-spinner-lines={12}
                                // disabled={this.state.email === "" || this.state.password === ""}
                                         className="button"
                            >
                                Sign in with uPort
                            </LaddaButton>
                        </div>
                    </form>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // startLogin: (email, password) => dispatch(startLogin(email, password)),
        authUser: (user) => dispatch(authUser(user)),
        showInfoBox: (message, type, timeout) => dispatch(showInfoBox(message, type, timeout)),
        showLoading: () => dispatch(showLoading()),
        hideLoading: () => dispatch(hideLoading()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

