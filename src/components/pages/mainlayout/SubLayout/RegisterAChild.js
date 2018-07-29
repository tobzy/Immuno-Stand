import React from 'react';
import '../../../../assets/css/overview.css'
import {showInfoBox} from '../../../sharedComponents/infoBox/actions'
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import {Input, message, DatePicker, Select} from 'antd';
import LaddaButton, {SLIDE_UP} from 'react-ladda';
import {postChildren} from "../../../../config/url";
import {axiosClient} from "../../../../tools/axiosClient";
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const Option = Select.Option;


class RegisterAChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "childName": "",
            "motherName": "",
            "dob": moment('2015/01/01', dateFormat),
            "phoneNumber": "",
            schedules:[]
        }

    }

    componentDidMount() {
        // this.getSummary()
    }

    submit = () => {
        this.setState({
            submitStatus: 'FETCHING'
        }, () => {
            this.props.showLoading();
            let scheduleList = this.state.schedules.map(item => {
                return  {
                    "immunizationCode": item,
                    "countTotal": 5,
                    "countCompleted": 0
                }
            })
            let params = {
                "childName": this.state.childName,
                "motherName": this.state.motherName,
                "dob": this.state.dob,
                "phoneNumber": this.state.phoneNumber,
                scheduleList
            }
            axiosClient.post(postChildren(this.props.user.id), params
            )
                .then(response => {
                    this.setSubmitStatusToCompleted();
                    message.success("Child successfully registered", 2)
                    this.setState({
                        "childName": "",
                        "motherName": "",
                        "dob": moment('2015/01/01', dateFormat),
                        "phoneNumber": ""
                    })
                })
                .catch((error) => {
                    message.error("Couldn't Register Child", 1)
                    this.setSubmitStatusToCompleted();
                });
        })
    }

    setSubmitStatusToCompleted() {
        this.setState({
            submitStatus: 'COMPLETED'
        })
        this.props.hideLoading();
    }

    render() {

        return <div className="fund">
            <h2>Register A Child</h2>
            <div style={{maxWidth: '400px'}}>
                <div className="form-group">
                    <label>Name</label>
                    <Input
                        onChange={(e) => this.setState({childName: e.target.value})}
                        size='large'
                        value={this.state.childName}
                    /></div>
                <div className="form-group">
                    <label>Mother's Name</label>
                    <Input
                        onChange={(e) => this.setState({motherName: e.target.value})}
                        size='large'
                        value={this.state.motherName}
                    /></div>
                <div className="form-group">
                    <label>Date Of Birth</label>
                    <DatePicker format={dateFormat} onChange={(date, dateString) => this.setState({dob: dateString})}/>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <Input
                        onChange={(e) => this.setState({phoneNumber: e.target.value})}
                        size='large'
                        value={this.state.phoneNumber}
                    /></div>
                <div className="form-group">
                    <label>Select Schedules (You can select more than one)</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select schedule"
                        defaultValue={["2"]}
                        onChange={this.handleScheduleChange}
                    >
                        <Option key={1}>Measles</Option>
                        <Option key={2}>Polio</Option>
                        <Option key={3}>Hepatitis B</Option>
                    </Select></div>

                <div style={{marginTop: '20px', textAlign: 'right'}}>
                    <LaddaButton loading={this.state.submitStatus === 'FETCHING'}
                                 onClick={this.submit}
                                 data-style={SLIDE_UP}
                                 id="submit"
                                 data-spinner-size={30}
                                 data-spinner-color="#fafafa"
                                 data-spinner-lines={12}
                        // disabled={this.state.email === "" || this.state.password === ""}
                                 className="button"
                    >
                        Register
                    </LaddaButton>
                </div>
            </div>

        </div>
    }

    handleScheduleChange = (value) => {
        console.log(value)
        this.setState({
            schedules:[...value]
        })
    }

}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        showInfoBox: (message, type, timeout) => dispatch(showInfoBox(message, type, timeout)),
        showLoading: () => dispatch(showLoading()),
        hideLoading: () => dispatch(hideLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAChild);