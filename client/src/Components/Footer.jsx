import { Component } from "react";

// Footer is implemented as a React Class Component to demonstrate
// class-based components alongside the app's functional components.
// It renders the Yanited Store branding and matches the existing visual style.
class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <footer className="footer">
        <div className="footer-container">
          <span className="footer-brand">Yanited Store</span>
          <span className="footer-text">
            &copy; {year} ManYtd. All rights reserved.
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
