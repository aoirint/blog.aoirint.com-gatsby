import { Link } from 'gatsby'
import React from 'react'
import icon from '../images/icon.png'
import '../styles/main.scss'

const Navbar: React.FC<{}> = () => {
    const [active, setActive] = React.useState<boolean>(false)

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to='/' className="navbar-item"x>
            <img src={icon} alt="Logo image" width="28" height="28" />
          </Link>

          <a
            role="button"
            className={`navbar-burger ${active ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => {
              setActive(!active)
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${active ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to='/' className="navbar-item">
              Home
            </Link>
            
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="https://twitter.com/aoirint" target='_blank'>
                  Twitter
                </a>
                <a className="navbar-item" href="https://github.com/aoirint" target='_blank'>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end" />
        </div>
      </nav>
    )
}

export default Navbar
