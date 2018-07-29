import React from 'react';
import {Table, message, Modal, Slider, InputNumber, Row, Col} from 'antd'
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import {axiosClient} from '../../../../tools/axiosClient.js'
import {getDashboardData, getChild, updateChild} from '../../../../config/url.js'
import {showInfoBox} from "../../../sharedComponents/infoBox/actions";


class ViewAll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: [],
            submitStatus: null,
            showChildDetailsModal: false,
            childData: {},
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'childName',
                }, {
                    title: 'Mother',
                    dataIndex: 'motherName',
                },
                {
                    title: 'Date Of Birth',
                    dataIndex: 'dob',
                },
                {
                    title: 'Phone Number',
                    dataIndex: 'phoneNumber',
                },
                {
                    title: '',
                    dataIndex: 'detailsHash',
                    render: id => <a href="javascript:;" onClick={() => this.getChild(id)}>{'View More / Edit'}</a>,
                },]
        }
    }

    componentDidMount() {
        this.getHospital();
    }

    getHospital = () => {
        this.setState({
            submitStatus: 'FETCHING'
        }, () => {
            this.props.showLoading();
            axiosClient.get(getDashboardData(this.props.user.id)
            )
                .then(response => {
                    this.setState({
                        children: [...response.data.children]
                    })
                    this.setSubmitStatusToCompleted();
                })
                .catch((error) => {
                    message.error("Couldn't get children list", 1)
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

    getChild = (id) => {
        this.props.showLoading()
        message.loading('Getting Child Details', 1);
        axiosClient.get(getChild(id))
            .then((response) => {
                this.setState({
                    showChildDetailsModal: true,
                    childData: response.data[0]
                })
                response.data[0].scheduleList.map((schedule) => {
                    this.setState({
                        [`$code${schedule.immunizationCode}`]: schedule.countCompleted
                    });
                    console.log(schedule)
                })
                this.props.hideLoading()

            })
            .catch((error) => {
                message.error("Couldn't retrieve child data", 1);
                this.props.hideLoading()
            })

    }

    getScheduleName = (scheduleNumber) => {
        if (scheduleNumber === "1") {
            return "Measles"
        }
        if (scheduleNumber === "2") {
            return "Polio"
        }
        if (scheduleNumber === "3") {
            return "Hepatitis B"
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2>Registered Children at {this.props.user.first_name}</h2>
                <Table columns={this.state.columns} dataSource={this.state.children}
                       pagination={false} loading={this.state.submitStatus === 'FETCHING'}/>
                {this.state.showChildDetailsModal && (
                    <Modal
                        title={"Child Details"}
                        visible={this.state.showChildDetailsModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelModal}
                        footer={null}
                    >
                        <section>
                            <div className='issue_modal_detail'>
                                <h4>Name</h4>
                                <p>{this.state.childData.childName}</p>
                            </div>
                            <div className='issue_modal_detail'>
                                <h4>Immunization Status</h4>
                                <p>{String(this.state.childData.immunizationComplete)}</p>
                            </div>
                            <h3 style={{margin:'20px 0'}}>Immunization Schedule</h3>
                            {this.state.childData.scheduleList.map((schedule) => {
                                return (
                                    <div className='issue_modal_detail'>
                                        <h4>{this.getScheduleName(schedule.immunizationCode)}</h4>
                                        <section style={{display: 'flex',justifyContent: 'flex-start',width: '300px'}}>
                                            <Col span={12}>
                                                <Slider min={0} max={5}
                                                        onChange={(value) => this.onSliderChange(schedule.immunizationCode, value)}
                                                        value={this.state[`$code${schedule.immunizationCode}`]}/>
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={0}
                                                    max={5}
                                                    style={{marginLeft: 16}}
                                                    value={this.state[`$code${schedule.immunizationCode}`]}
                                                    onChange={(value) => this.onSliderChange(schedule.immunizationCode, value)}
                                                />
                                            </Col>
                                        </section>
                                    </div>
                                )
                            })}
                            {/*<div className='issue_modal_detail'>*/}
                            {/*<h4>Issue Types</h4>*/}
                            {/*<p>{this.state.childData.data.issuetype}</p>*/}
                            {/*</div>*/}
                            {/*<div className='issue_modal_detail'>*/}
                            {/*<h4>Offender Name</h4>*/}
                            {/*<p>{this.state.childData.data.offendername}</p>*/}
                            {/*</div>*/}
                        </section>
                    </Modal>
                )}
            </React.Fragment>
        )
    }

    handleCancelModal = () => {
        this.setState({
            showChildDetailsModal: false
        })
    }
    handleOk = () => {
        this.setState({
            showChildDetailsModal: false
        })
    }

    onSliderChange = (immunizationCode, value) => {
        this.setState({
            [`$code${immunizationCode}`]: value,
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
