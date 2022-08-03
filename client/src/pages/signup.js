import { useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { USER } from "../utils/queries"
import Auth from "../utils/auth"

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'

import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Dashboard = () => {
  const navigate = useNavigate()
  const currentUser = Auth.loggedIn()
  const { loading, error, data } = useQuery(USER, {
    variables: {
      _id: currentUser?.data?._id
    }
  })

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!currentUser) {
    navigate('/login')
  }
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const user = data?.user
  if (!user) {
    return 'No user found'
  }


  return (
    <>
      <Container maxWidth="xl">
        <div className="App">
          <header className="App-header">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar color="secondary">
                <Toolbar>
                  <div>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                      <MenuItem onClick={handleClose}>Login</MenuItem>
                    </Menu>
                  </div>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                    Jaguar Games
                  </Typography>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search Games..."
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Toolbar>
              </AppBar>
            </Box>

            <Card style={{ margin: 20 }}>
              <CardMedia
                component="img"
                alt="picture of jaguar games logo"
                height="200"
                image="./images/red-jaguar-games-logo.png"
              />
            </Card>

            <TextField variant="outlined" type="email" label="Email" helperText="Please enter your email" />
            <TextField variant="outlined" type="email" label="Confirm Email" helperText="Please re-enter your email" />
            <TextField variant="outlined" label="Password" helperText="Please enter your password" />
            <TextField variant="outlined" label="Confirm Password" helperText="Please re-enter your Password" />

            <Button
              style={{ marginBottom: 200, marginTop: 20 }}
              variant="contained"
              size="small"
              href="#"
              onClick={() => alert('hello')}
            >
              Submit
            </Button>

          </header>
        </div>
      </Container>
    </>
  )
}

export default Dashboard