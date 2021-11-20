import React from 'react'
import icon from '../images/icon.png'

const Navbar: React.FC<{}> = () => {
    const [active, setActive] = React.useState<boolean>(false)

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={icon} alt="Logo image" width="28" height="28" />
          </a>

          <a role="button" className={`navbar-burger ${active ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => {
            setActive(!active)
          }}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${active ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
          </div>

          <div className="navbar-end" />
        </div>
      </nav>
    )
}

export default Navbar
