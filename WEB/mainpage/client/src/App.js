import './App.css';
import Customer from './components/Customer';
import DataAdd from './components/DataAdd';
import Login from './components/Login';
import Signin from './components/Signin';

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
import Button from '@mui/material/Button'; 
import MenuItem from '@mui/material/MenuItem'; // Dropdown 메뉴 아이템 추가
import Menu from '@mui/material/Menu'; // Dropdown 메뉴 추가

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
      searchKeyword: '',
      mode: "",
      inpaintingType: "Type1", // Inpainting 타입 추가
      anchorEl: null, // Dropdown 메뉴를 열고 닫기 위한 anchorEl 추가
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
    fetch("/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          this.setState({ mode: "WELCOME" });
        } else {
          this.setState({ mode: "LOGIN" });
        }
      });
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

  handleDropdownOpen = (event) => { // Dropdown 메뉴 열기
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDropdownClose = () => { // Dropdown 메뉴 닫기
    this.setState({ anchorEl: null });
  };

  handleDropdownSelect = (inpaintingType) => { // Dropdown 메뉴에서 항목 선택
    this.setState({ inpaintingType });
    this.handleDropdownClose();
  };

  handleInpainting = () => {
    // Inpainting 작업 시작 시 로딩 표시를 보이도록 설정
    this.setState({ loading: true, completed: 0 }); // completed 상태를 0으로 초기화
  
    fetch(`/api/runInpaintingScript?type=${this.state.inpaintingType}`) // Inpainting 스크립트를 실행하는 요청을 보냄
      .then(response => {
        if (response.ok) {
          alert('Inpainting 작업이 성공적으로 실행되었습니다.');
          // Inpainting 작업이 완료된 후에 이미지 데이터를 다시 불러옴
          this.stateRefresh();
        } else {
          alert('Error: Mask Image가 모두 있는지 확인하세요.');
          throw new Error('Inpainting 작업 실행에 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('Inpainting 작업 실패:', error);
      })
      .finally(() => {
        // Inpainting 작업 완료 후 로딩 표시를 제거
        this.setState({ loading: false });
      });
  }
  
  handleLogout = () => {
    fetch("/logout")
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === "True") {
          this.setState({ mode: "LOGIN" });
          document.cookie = "userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
          alert(json.isSuccess);
        }
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        this.setState({ mode: "LOGIN" });
        document.cookie = "userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
  };

  render() {
    let content = null;  

    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c,index) => {
        return <Customer stateRefresh={this.stateRefresh} key = {c.id} id = {c.id} num = {index + 1 } image={c.image} inpainted={c.image2} mask={c.mask} name={c.name} explanation={c.explanation} />
      });
    }
    const cellList = ["Number", "Original Image", "Mask Image", "Inpainted Image","Name", "Explanation", "Setting"];

    if(this.state.mode === "LOGIN"){
      content = <Login setMode={mode => this.setState({ mode })} /> 
    } else if (this.state.mode === 'SIGNIN') {
      content = <Signin setMode={mode => this.setState({ mode })} /> 
    } else if (this.state.mode === 'WELCOME') {
      content = <>
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
                </Search> &nbsp;&nbsp;
                <Button variant="contained" color="secondary" onClick={this.handleLogout} >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box><br />
          <DataAdd style={{ marginTop: 20, marginBottom: 20, display: 'flex', alignItems: "center", justifyContent: "center" }} stateRefresh={this.stateRefresh} />
          
          <br />

          <Paper sx={{ width: "100%" }}>
            <Table sx={{ minWidth: '1080px' }}>
              <TableHead >
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
          <br/>
           {/* Dropdown 메뉴 추가 */}
           <Button
            variant="contained"
            color="primary"
            onClick={this.handleDropdownOpen}
            disabled={this.state.loading}
          >
            {this.state.inpaintingType ? `MODEL (${this.state.inpaintingType})` : 'Model Select'}
          </Button>
          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleDropdownClose}
          >
            <MenuItem onClick={() => this.handleDropdownSelect("type1")}>Type 1</MenuItem>
            <MenuItem onClick={() => this.handleDropdownSelect("type2")}>Type 2</MenuItem>
            <MenuItem onClick={() => this.handleDropdownSelect("type3")}>Type 3</MenuItem>
          </Menu> &nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleInpainting}
            disabled={this.state.loading}
          >
            {this.state.loading ? 'Inpainting 작업 진행 중...' : 'Inpainting'}
          </Button>
        </div>
      </>
    }
    return (
      <>
        <div>
          {content}
        </div>
      </>
    );
  }
}

export default App;
