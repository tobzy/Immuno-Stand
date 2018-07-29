import React from 'react'
import {Checkbox} from 'antd'
import _ from 'lodash/object'

class FilterBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: false,
            'low-pen': false,
            'high-pen': false,
            type: false,
            'low-int': false,
            'high-int': false,
        }
    }

    onChange = (e, type) => {
        for(let type in this.state){
            if(this.state[type]){
                this.setState({
                    [type]:false
                })
            }
        }
        this.setState({
            [type]:e.target.checked
        }, ()=>{
            this.props.onFilter(_.findKey(this.state, value=>value))
        })
    }

    render() {
        return (
            <div>
                <Checkbox onChange={(e, type) => this.onChange(e, 'date')}
                          checked={this.state.date}>Date</Checkbox>
                <Checkbox onChange={(e, type) => this.onChange(e, 'low-pen')}
                          checked={this.state['low-pen']}>Lowest Penalty</Checkbox>
                <Checkbox onChange={(e, type) => this.onChange(e, 'high-pen')}
                          checked={this.state['high-pen']}>Highest Penalty</Checkbox>
                <Checkbox onChange={(e, type) => this.onChange(e, 'type')}
                          checked={this.state.type}>Type</Checkbox>
                <Checkbox onChange={(e, type) => this.onChange(e, 'low-int')}
                          checked={this.state['low-int']}>Lowest Interest</Checkbox>
                <Checkbox onChange={(e, type) => this.onChange(e, 'high-int')}
                          checked={this.state['high-int']}>Highest Interest</Checkbox>
            </div>
        )
    }
}

export default FilterBox