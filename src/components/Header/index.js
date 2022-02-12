import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    isActive: false,
  }

  onChange = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  onClose = () => {
    this.setState({isActive: false})
  }

  showItems = () => (
    <>
      <div className="close-container">
        <ul className="nav-item">
          <Link to="/" className="link">
            <li className="item">Home</li>
          </Link>
          <Link to="/about" className="link">
            <li className="item">About</li>
          </Link>
          <Link to="/vaccination" className="link">
            <li className="item">Vaccination</li>
          </Link>
        </ul>
        <button type="button" className="button" onClick={this.onClose}>
          <img
            src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644566572/Shape_hewlfb_liwnwo.png"
            alt="close icon"
          />
        </button>
      </div>
    </>
  )

  render() {
    const {isActive} = this.state
    return (
      <>
        <div className="main-container">
          <div className="header-container">
            <Link to="/" className="link">
              <h1 className="logo">
                COVID19
                <span className="india">INDIA</span>
              </h1>
            </Link>
            <ul className="nav-items">
              <Link to="/" className="link">
                <li className="item">Home</li>
              </Link>
              <Link to="/about" className="link">
                <li className="item">About</li>
              </Link>
              <Link to="/vaccination" className="link">
                <li className="item">Vaccination</li>
              </Link>
            </ul>
            <button type="button" className="button" onClick={this.onChange}>
              <img
                src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644562749/add-to-queue_mhgx0s.png"
                alt="menu item"
              />
            </button>
          </div>
          <div className="mobile-container">
            {isActive ? this.showItems() : null}
          </div>
        </div>
      </>
    )
  }
}
export default Header
