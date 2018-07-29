import React, {Component} from 'react';
import {Link} from 'react-router'

class NotFoundPage extends Component {

  render() {
    return (
      <div>
        <div className="four-zero-area">
          <div className="four-zero-top">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="four-zero-image text-center">
                    <img src="images/img_404.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="four-zero-bottom">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="four-zero-content text-center">
                    <h2>Oops ! that page can't be reached.</h2>
                    <p>Can't find what you need? Take a moment and do a search below!</p>
                  </div>
                  <div className="four-zero-input-wrapp posr text-center">
                    <div className="four-zero-input">
                      <input className="form-control" type="text" placeholder="Search...."/>
                    </div>
                    <div className="four-zero-content">
                      <p>Or go back to <Link to="/">Home</Link> </p>
                    </div>
                    <div className="four-zero-search">
                      <i className="fa fa-search"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NotFoundPage;  