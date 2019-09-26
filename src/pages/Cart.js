import React, { Component } from 'react'
import { connect } from 'react-redux'

class Cart extends Component {
    render() {
        return (
            <>
                <div className="container my-5">
                    <h1>ตะกร้าสินค้า {this.props.total}  ชิ้น</h1><br />
                    <ul>
                        {
                            this.props.cart.map((menu, index) => {
                                return (
                                    <li key="menu._id">
                                        {index + 1} {menu.name} ราคา {menu.price} จำนวน {menu.qty} ชิ้น
                                    </li>
                                ) 
                            })
                        }
                    </ul>
                </div>

            </>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        total: state.cartReducer.total
    }
}

export default connect(mapStatetoProps)(Cart)