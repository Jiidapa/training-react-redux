import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux'
import { addToCart } from '../redux/actions/cartAction'
import { stat } from "fs";

class Shop extends Component {
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  state = {
    shop: {},
    location: {
      lat: 0,
      lgn: 0
    },
    menus: []
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const shopUrl = 'https://shop-backendapi.herokuapp.com/api/shop/' + id;
      const response = await axios.get(shopUrl, {
        cancelToken: this.source.token
      });
      this.setState({
        shop: response.data.data,
        location: response.data.data.location,
        menus: response.data.data.menus
      })
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else {
        console.log(error)
      }
    }
  }

  componentWillUnmount() {
    this.source.cancel()
  }

  addToCart = (menu) => {
    const item = {
      id: menu._id,
      name: menu.name,
      price: menu.price.$numberDecimal,
      qty: 1
    }

    this.props.dispatch(addToCart(item, this.props.cart))
  }

  render() {
    return (
      <div className="container my-5">
        <h1>{this.state.shop.name}</h1>
        <div className="row mt-4">
          {
            this.state.menus.map((menu) => {
              return (
                <div className="col-md-4" key={menu._id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-me-6">
                          ชื่อ {menu.name}<br />
                          ราคา {menu.price.$numberDecimal} บาท<br />
                          <button onClick={() => { this.addToCart(menu) }} className="btn btn-primary">
                            ซื้อเลย
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    cart: state.cartReducer.cart
  }
}

export default connect(mapStatetoProps)(Shop);