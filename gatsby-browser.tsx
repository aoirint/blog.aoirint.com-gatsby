import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { GatsbyBrowser } from 'gatsby'
import React from 'react'
import ThemeComponent from './src/components/ThemeComponent'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return (
    <>
      <ThemeComponent>{element}</ThemeComponent>
    </>
  )
}
