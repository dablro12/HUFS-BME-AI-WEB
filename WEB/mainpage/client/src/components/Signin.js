// import React, { Component } from 'react';
// import './Login.css';

// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// class Signin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: "",
//       password: "",
//       password2: ""
//     };
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = () => {
//     const { id, password, password2 } = this.state;
//     if (password !== password2) {
//       alert("비밀번호가 일치하지 않습니다.");
//       return;
//     }

//     const userData = {
//       userId: id,
//       userPassword: password,
//       userPassword2: password2,
//     };
//     fetch("/signin", {
//       method: "post",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         if(json.isSuccess === "True"){
//           alert('회원가입이 완료되었습니다!')
//           this.props.setMode("LOGIN");
//         } else{
//           alert(json.isSuccess);
//         }
//       });
//   };

//   render() {
//     const { id, password, password2 } = this.state;
//     return (
//       <Box className="background">
//         <h2 className="form">회원가입</h2>

//         <Box className="form" component="form" noValidate autoComplete="off">
//           <TextField
//             className="login"
//             type="text"
//             name="id"
//             value={id}
//             label="아이디"
//             variant="outlined"
//             onChange={this.handleChange}
//           />
//           <TextField
//             className="login"
//             type="password"
//             name="password"
//             value={password}
//             label="비밀번호"
//             variant="outlined"
//             onChange={this.handleChange}
//           />
//           <TextField
//             className="login"
//             type="password"
//             name="password2"
//             value={password2}
//             label="비밀번호 확인"
//             variant="outlined"
//             onChange={this.handleChange}
//           />
//           <Box textAlign="center" mt={2}>
//             <Button
//               className="btn"
//               variant="contained"
//               onClick={this.handleSubmit}
//             >
//               회원가입
//             </Button>
//           </Box>
//         </Box>

//         <p className="form">
//           로그인화면으로 돌아가기  
//           <Button onClick={() => this.props.setMode("LOGIN")}>로그인</Button>
//         </p>
//       </Box>
//     ); 
//   }
// }

// export default Signin;

import React, { Component } from 'react';
import './Login.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      password2: "",
      nickname: ""
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { id, password, password2, nickname } = this.state;
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      userId: id,
      userPassword: password,
      userPassword2: password2,
      nickname: nickname,
    };
    fetch("/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.isSuccess === "True"){
          alert('회원가입이 완료되었습니다!')
          this.props.setMode("LOGIN");
        } else{
          alert(json.isSuccess);
        }
      });
  };

  render() {
    const { id, password, password2, nickname } = this.state;
    return (
      <Box className="background">
        <h2 className="form">회원가입</h2>

        <Box className="form" component="form" noValidate autoComplete="off">
          <TextField
            className="login"
            type="text"
            name="id"
            value={id}
            label="아이디"
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            className="login"
            type="password"
            name="password"
            value={password}
            label="비밀번호"
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            className="login"
            type="password"
            name="password2"
            value={password2}
            label="비밀번호 확인"
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            className="login"
            type="text"
            name="nickname"
            value={nickname}
            label="닉네임" // 닉네임 입력 필드 추가
            variant="outlined"
            onChange={this.handleChange}
          />
          <Box textAlign="center" mt={2}>
            <Button
              className="btn"
              variant="contained"
              onClick={this.handleSubmit}
            >
              회원가입
            </Button>
          </Box>
        </Box>

        <p className="form">
          로그인화면으로 돌아가기  
          <Button onClick={() => this.props.setMode("LOGIN")}>로그인</Button>
        </p>
      </Box>
    ); 
  }
}

export default Signin;

