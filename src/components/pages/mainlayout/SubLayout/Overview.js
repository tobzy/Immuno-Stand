import React from 'react';
import '../../../../assets/css/overview.css'
import {showInfoBox} from '../../../sharedComponents/infoBox/actions'
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux';
import address from '../../../../assets/img/address.svg'
import {getDashboardData} from '../../../../config/url.js'
import {axiosClient} from '../../../../tools/axiosClient.js'
import {Card, Icon, Avatar, Row, Col, List, message} from 'antd'
import {Doughnut} from 'react-chartjs-2';

const {Meta} = Card;

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: [],
            pieChartData: {
                labels: [
                    'Immunized',
                    'Un-immunized',
                ],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }

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
                    console.log(response.data)
                    let numOfImm = response.data.children.filter((child) => child.immunizationComplete).length;
                    let numOfUnImm = response.data.children.length - numOfImm

                    let pieChartData = {...this.state.pieChartData}
                    pieChartData.datasets[0].data = [numOfImm, numOfUnImm]
                    this.setState({
                        children: [...response.data.children],
                        pieChartData: {...pieChartData}
                    })
                    this.setSubmitStatusToCompleted();
                })
                .catch((error) => {
                    message.error("Couldn't get hospital data", 1)
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

        return <div className="overview">
            <div className='top-section'>
                {/*<h3>Hospital Dashboard</h3>*/}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card
                            style={{width: 300}}
                            // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                        >
                            <Meta
                                avatar={<Avatar src={address}/>}
                                title="Registered Children"
                                description={String(this.state.children.length)}
                            />
                        </Card>
                    </Col>
                    {/*<Col span={6}>*/}
                    {/*<Card*/}
                    {/*style={{width: 300}}*/}
                    {/*// cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}*/}
                    {/*// actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}*/}
                    {/*>*/}
                    {/*<Meta*/}
                    {/*avatar={<Avatar src={pound}/>}*/}
                    {/*title="Balance in pounds"*/}
                    {/*description={`N${this.state.balance.GBP}`}*/}
                    {/*/>*/}
                    {/*</Card>*/}
                    {/*</Col>*/}
                </Row>
            </div>
            <div className='top-section' style={{width:'400px', marginTop:'30px'}}>
                <h3>Charts</h3>
                <Doughnut data={this.state.pieChartData}
                          width={100}
                          height={100}
                          // options={{
                          //     maintainAspectRatio: false
                          // }}
                    />
                {/*<div className="transactions-list-box">*/}
                    {/*<List*/}
                        {/*itemLayout="horizontal"*/}
                        {/*dataSource={this.props.user.transactions}*/}
                        {/*renderItem={item => (*/}
                            {/*<List.Item>*/}
                                {/*<List.Item.Meta*/}
                                    {/*avatar={<Avatar src={Arrows}/>}*/}
                                    {/*title={<a>{item.recipient}</a>}*/}
                                    {/*description={item.reference}*/}
                                {/*/>*/}
                            {/*</List.Item>*/}
                        {/*)}*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>


        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);