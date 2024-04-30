import './App.css';
import Customer from './components/Customer';
import DataAdd from './components/DataAdd';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress'; //로딩 중 일 때 동그란 원이 나타나느 라이브러리
import Paper from '@mui/material/Paper';
import React, { Component } from 'react';

//App Bar 구현 라이브러리들
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageData: '',
      completed: 0,  //로딩될때 동그란 원이 로딩중임을 나타낼때 사용하기 위한 변수
      searchKeyword: ''
    } 
  }

  stateRefresh = () => {
    this.setState({
      imageData: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ imageData: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() { //서버 api에서 data를 받아오는 함수
    this.timer = setInterval(this.progress, 800); //1000이 1초 -> 20은 0.02초
    this.callApi()
      .then(res => this.setState({ imageData: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/main'); //주소에서 데이터 받아옴
    const body = await response.json(); //받아온 데이터를 json형태로 body에 저정함
    return body;
  }

  progress = () => { //로딩하는 원에 대한 함수
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 10 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key = {c.id} id = {c.id} image={c.image} inpainted={c.inpainted} name={c.name} explanation={c.explanation} />
      });
    }
    const cellList = ["Number", "Original Image", "Inpainted Image", "Name", "Explanation", "Setting"];
    return (
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ minWidth: '1080px' }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Image Inpainting WEB
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box><br />
        <DataAdd style={{ marginTop: 20, marginBottom: 20, display: 'flex', alignItems: "center", justifyContent: "center" }} stateRefresh={this.stateRefresh} />
        <br />

        <Paper sx={{ width: "100%" }}>
          <Table sx={{ minWidth: '1080px' }}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell sx={{ fontSize: '1.0rem' }}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.imageData ?
                filteredComponents(this.state.imageData) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>


      </div>

    );
  }
}

export default App;
