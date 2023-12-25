import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

interface NavItem {
  text: string
  href: string
  isMe?: boolean
}

const leftNavItems: Array<NavItem> = [
  {
    text: 'ホーム',
    href: '/',
  },
]

const rightNavItems: Array<NavItem> = [
  {
    text: 'Twitter',
    href: 'https://twitter.com/aoirint',
    isMe: true,
  },
  {
    text: 'GitHub',
    href: 'https://github.com/aoirint',
    isMe: true,
  },
  {
    text: 'Profile',
    href: 'https://aoirint.com',
    isMe: true,
  },
]

function NavBarLinkItem({ navItem }: { navItem: NavItem }): JSX.Element {
  return (
    <>
      <Button
        key={navItem.text}
        href={navItem.href}
        rel={navItem.isMe ? 'me' : undefined}
        LinkComponent={({ href, ...rest }) => <GatsbyLink to={href} {...rest} />}
        sx={{
          textTransform: 'none',
          color: '#fff',
        }}
      >
        {navItem.text}
      </Button>
    </>
  )
}

function NavDrawerLinkItem({ navItem }: { navItem: NavItem }): JSX.Element {
  return (
    <>
      <ListItemButton
        key={navItem.text}
        href={navItem.href}
        rel={navItem.isMe ? 'me' : undefined}
        LinkComponent={({ href, ...rest }) => <GatsbyLink to={href} {...rest} />}
        sx={{ textAlign: 'center' }}
      >
        <ListItemText primary={navItem.text} />
      </ListItemButton>
    </>
  )
}

export default function Navbar(): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawerWidth = 240

  const navDrawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        aoirint
      </Typography>
      <Divider />
      <List>
        {leftNavItems.map((navItem, navItemIndex) => (
          <NavDrawerLinkItem key={navItemIndex} navItem={navItem} />
        ))}
      </List>
      <Divider />
      <List>
        {rightNavItems.map((navItem, navItemIndex) => (
          <NavDrawerLinkItem key={navItemIndex} navItem={navItem} />
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MuiLink component={GatsbyLink} to='/' color='inherit' underline='none'>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StaticImage src='../images/icon.png' alt='Logo image' width={28} height={28} />
                <Typography variant='subtitle1' component='div' sx={{ ml: '0.5rem' }}>
                  えやみぐさ
                </Typography>
              </Box>
            </MuiLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ mx: 1 }}>
                {leftNavItems.map((navItem, navItemIndex) => (
                  <NavBarLinkItem key={navItemIndex} navItem={navItem} />
                ))}
              </Box>
              <Box>
                {rightNavItems.map((navItem, navItemIndex) => (
                  <NavBarLinkItem key={navItemIndex} navItem={navItem} />
                ))}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {navDrawerContent}
        </Drawer>
      </nav>
    </>
  )
}
