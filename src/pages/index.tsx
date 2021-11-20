import * as React from "react"
import Helmet from 'react-helmet'
import '../styles/main.scss'

import icon from '../images/icon.png'
import {
  Navbar,
} from '../components'

// markup
const IndexPage: React.FC<{}> = () => {
  return (
    <>
      <Helmet>
        <title>えやみぐさ</title>
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-narrow'>
              <img src={icon} alt="Logo image" className='image is-64x64 mr-4' />
            </div>
            <div className='column'>
              <h1 className='title is-2'>
                えやみぐさ
              </h1>
              <p className='subtitle is-5'>
                技術ノートとか
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndexPage
