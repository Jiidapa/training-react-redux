import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer mt-auto w-100 bg-success py-3 text-center text-light">
          <p className="my-0">© food store {new Date().getFullYear()}</p>
        </footer>
      </>
    );
  }
}

export default Footer;

