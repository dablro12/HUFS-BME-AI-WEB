
import React, { Component } from 'react';
import './Login.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: ""
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { id, password } = this.state;
    const userData = {
      userId: id,
      userPassword: password,
    };
    fetch("/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {            
        if(json.isLogin === "True"){
          this.props.setMode("WELCOME");
        } else {
          alert(json.isLogin);
        }
      });
  };

  render() {
    const { id, password } = this.state;
    return (
      <Box className="background">
        <h2 className='form'>로그인</h2>
        
        

        <Box className="form" component="form" noValidate autoComplete="off"><br/>
          <TextField
            className="login"
            type="text"
            name="id"
            value={id}
            label="아이디"
            variant="outlined"
            onChange={this.handleChange}
          /><br/>
          <TextField
            className="login"
            type="password"
            name="password"
            value={password}
            label="비밀번호"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Box textAlign="center" mt={2}>
            <Button
              className="btn"
              variant="contained"
              onClick={this.handleSubmit}
            >
              로그인
            </Button>
          </Box>
        </Box>
        

        <p className='form'>
          계정이 없으신가요?  
          <Button onClick={() => this.props.setMode("SIGNIN")}>회원가입</Button>
        </p>
      </Box>
    ); 
  }
}

export default Login;
