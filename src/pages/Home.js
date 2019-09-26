import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  state = {
    shops: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const shopUrl = 'https://shop-backendapi.herokuapp.com/api/shop'
      const response = await axios.get(shopUrl, {
        cancelToken: this.source.token
      });
      this.setState({
        shops: response.data.data
      })
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled didmount');
      } else {
        console.log(error)
      }
    }
  }

  componentWillUnmount() {
    this.source.cancel('willUnMOunt')
    console.log('test')
  }

  render() {
    return (
      <div>
        <main role="main">
          {/* Main jumbotron for a primary marketing message or call to action */}
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-4">ยินดีต้อนรับสู่... ร้านอาหารออนไลน์</h1>
              <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
              <p><a className="btn btn-warning btn-lg" href="/" role="button">ซื้อเลย</a></p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {
                this.state.shops.map((shop) => {
                  return (
                    <div className="col-md-4 mb-3" key={shop.id} >
                      <div className="card" style={{ width: '18rem' }}>
                        <img src={shop.photo} height="225" className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{shop.name}</h5>
                          <Link className="btn btn-success" to={
                            { pathname: '/shop/' + shop.id }
                          }>
                            View Menu
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div> {/* /container */}
        </main>
      </div>
    );
  }
}

export default Home;