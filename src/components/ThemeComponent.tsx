import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme, useMediaQuery } from '@mui/material'
import React from 'react'

export default function ThemeComponent({ children }): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}
