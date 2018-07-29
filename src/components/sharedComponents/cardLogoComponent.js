import React, {Component} from 'react';

// import mastercard from '../../assets/images/cardLogos/MasterCard.svg'
// import visa from '../../assets/images/cardLogos/visa.svg'

class CardLogo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logo: ''
        }
    }

    componentWillReceiveProps(){
        import(`../../assets/images/cardLogos/${this.props.brand}.svg`).then((module) => {
            this.setState({
                logo:module
            })
        })
    }


    render() {
        return (
            <img src={this.state.logo}/>
        );
    }
}

export default CardLogo;
