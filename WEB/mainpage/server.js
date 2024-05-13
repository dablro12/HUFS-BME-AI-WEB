// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 5002;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// var maindb = require('./maindb.js');


// const multer = require('multer');
// const upload = multer({dest: './upload'})
   
// app.get('/api/main', (req,res) => {
//     maindb.query(
//         "SELECT * FROM IMAGEBOARD WHERE isDeleted = 0",
//         (err, rows, fields) => {
//             res.send(rows);
//         }
//     )
// });

// app.use('/image', express.static('./upload')); //사용자에게 /image라는 폴더가 서버의 ./upload 라는 폴더로 연결된다.

// app.post('/api/main', upload.single('image'), (req,res) => {
//     let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, ?, ?,? ,now(), 0)';
//     let image = '/image/' + req.file.filename;
//     let inpainted = ' ';
//     let name = req.body.name;
//     let explanation= req.body.explanation;
//     let params = [image, inpainted, name, explanation];
//     maindb.query(sql, params,
//         (err, rows, fields) => {
//             res.send(rows);
//             // console.log(err); //로그를 찍어보면서 에러를 확인한다.
//             // console.log(rows);
//         }
//     );
// });

// // app.post('/api/main', upload.array('image',2), (req,res) => {
// //     let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, ?, ?,? ,now(), 0)';
// //     let image = '/image/' + req.files[0].filename;
// //     let inpainted = '/image/' + 'inpainted_' + req.files[1].filename;
// //     let imageName = req.body.imageName;
// //     let explanation= req.body.explanation;
// //     let params = [image, inpainted,imageName, explanation];
// //     maindb.query(sql, params,
// //         (err, rows, fields) => {
// //             res.send(rows);
// //         }
// //     );
// // });

// app.delete('/api/main/:id', (req, res) => {
//     let sql = 'UPDATE IMAGEBOARD SET isDeleted = 1 WHERE id = ?';
//     let params = [req.params.id];
//     maindb.query(sql,params,
//         (err,rows,fields) => {
//             res.send(rows);
//         }
//     )
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));
// 이미지 크기 페이로드 제한 전 코드 -> 실행하면 크기가 커서 저장 불가라고 나옴

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 5002;
// const fs = require('fs');
// const path = require('path');
// const maindb = require('./maindb.js');
// const { exec } = require('child_process'); // child_process 모듈을 추가하여 외부 스크립트 실행
// const cors = require('cors');
// app.use(cors());

// app.use(bodyParser.json({ limit: '10mb' }));

// const session = require('express-session');
// const sessionOption = require('./sessionOption');
// const bcrypt = require('bcrypt');

// app.use(bodyParser.urlencoded({ extended: false }));

// var MySQLStore = require('express-mysql-session')(session);
// var sessionStore = new MySQLStore(sessionOption);
// app.use(session({  
// 	key: 'session_cookie_name',
//     secret: '~',
// 	store: sessionStore,
// 	resave: false,
// 	saveUninitialized: false
// }))


// app.get('/authcheck', (req, res) => {      
//     const sendData = { isLogin: "" };
//     if (req.session.is_logined) {
//         sendData.isLogin = "True"
//     } else {
//         sendData.isLogin = "False"
//     }
//     res.send(sendData);
// })

// app.get('/logout', function (req, res) {
//     req.session.destroy(function (err) {
//         res.redirect('/');
//     });
// });

// app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
//     const username = req.body.userId;
//     const password = req.body.userPassword;
//     const sendData = { isLogin: "" };

//     if (username && password) {             // id와 pw가 입력되었는지 확인
//         maindb.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results, fields) {
//             if (error) throw error;
//             if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      

//                 bcrypt.compare(password , results[0].password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교

//                     if (result === true) {                  // 비밀번호가 일치하면
//                         req.session.is_logined = true;      // 세션 정보 갱신
//                         req.session.nickname = username;
//                         req.session.save(function () {
//                             sendData.isLogin = "True"
//                             res.send(sendData);
//                         });
//                         maindb.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
//                             , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
//                     }
//                     else{                                   // 비밀번호가 다른 경우
//                         sendData.isLogin = "로그인 정보가 일치하지 않습니다."
//                         res.send(sendData);
//                     }
//                 })                      
//             } else {    // db에 해당 아이디가 없는 경우
//                 sendData.isLogin = "아이디 정보가 일치하지 않습니다."
//                 res.send(sendData);
//             }
//         });
//     } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
//         sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
//         res.send(sendData);
//     }
// });

// app.post("/signin", (req, res) => {  // 데이터 받아서 결과 전송
//     const username = req.body.userId;
//     const password = req.body.userPassword;
//     const password2 = req.body.userPassword2;
    
//     const sendData = { isSuccess: "" };

//     if (username && password && password2) {
//         maindb.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
//             if (error) throw error;
//             if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
//                 const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
//                 maindb.query('INSERT INTO userTable (username, password) VALUES(?,?)', [username, hasedPassword], function (error, data) {
//                     if (error) throw error;
//                     req.session.save(function () {                        
//                         sendData.isSuccess = "True"
//                         res.send(sendData);
//                     });
//                 });
//             } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우                  
//                 sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
//                 res.send(sendData);
//             }
//             else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
//                 sendData.isSuccess = "이미 존재하는 아이디 입니다!"
//                 res.send(sendData);  
//             }            
//         });        
//     } else {
//         sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
//         res.send(sendData);  
//     }
    
// });

// const multer = require('multer');
// const upload = multer({ 
//   dest: './upload',
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Only image files are allowed!'));
//     }
//     cb(null, true);
//   }
// });
// const maskDir = path.join(__dirname, 'mask');

// app.get('/api/main', (req, res) => {
//     maindb.query(
//         "SELECT * FROM IMAGEBOARD WHERE isDeleted = 0",
//         (err, rows, fields) => {
//             res.send(rows);
//         }
//     )
// });

// app.use('/image', express.static('../inference/img'));
// app.use('/inpainted', express.static('../inference/res'));
// app.use('/mask', express.static('../inference/mask'));

// app.post('/api/main', upload.single('image'), (req, res) => {
//     let imageExtension = req.file.originalname.split('.').pop();
//     let imageName = req.body.name + '.' + imageExtension;
//     let imagePath = '/image/' + imageName;
//     let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, null, ?,? ,now(), 0,null)';
//     let params = [imagePath,req.body.name, req.body.explanation];
    
//     fs.renameSync(req.file.path, path.join(__dirname, '..', 'inference', 'img', imageName));
    
//     maindb.query(sql, params,
//         (err, rows, fields) => {
//             if (err) {
//                 console.error('이미지 저장 실패:', err);
//                 res.status(500).send('이미지 저장에 실패했습니다.');
//             } else {
//                 res.send(rows);
//             }
//         }
//     );
// });

// app.delete('/api/main/:id', (req, res) => {
//     let sql = 'UPDATE IMAGEBOARD SET isDeleted = 1 WHERE id = ?';
//     let params = [req.params.id];
//     maindb.query(sql,params,
//         (err,rows,fields) => {
//             res.send(rows);
//         }
//     )
// });

// app.post('/api/saveImage', (req, res) => {
//   const imageDataURL = req.body.imageDataURL;
//   const base64Data = imageDataURL.replace(/^data:image\/png;base64,/, '');
//   const maskImageName =  req.body.imageName + '.png'; 

//   fs.writeFile(path.join(__dirname,'..', 'inference', 'mask', maskImageName), base64Data, 'base64', (err) => {
//     if (err) {
//       console.error('이미지 저장 실패:', err);
//       res.status(500).send('이미지 저장에 실패했습니다.');
//     } else {
//       const maskImagePath = '/mask/' + maskImageName;
//       console.log(maskImagePath);
//       const imageName = req.body.imageName; 

//       maindb.query(
//         'UPDATE IMAGEBOARD SET mask = ? WHERE name = ?',
//         [maskImagePath, imageName],
//         (error, results) => {
//           if (error) {
//             console.error('데이터베이스 업데이트 실패:', error);
//             res.status(500).send('데이터베이스 업데이트에 실패했습니다.');
//           } else {
//             res.send({ maskImagePath });
//           }
//         }
//       );
//     }
//   });
// });


// // Inpainting 스크립트 실행 요청 처리
// app.get('/api/runInpaintingScript', (req, res) => {
//   exec('/Users/jeong-yeongjin/HUFS-BME-AI-WEB/HUFS-BME-AI-WEB/AI/inference/run.sh', (error, stdout, stderr) => {
//     if (error) {
//       console.error('스크립트 실행 실패:', error);
//       res.status(500).send('Inpainting 스크립트 실행에 실패했습니다.');
//     } else {
//       console.log('스크립트 실행 결과:', stdout);
//       res.send({ message: 'Inpainting 스크립트가 성공적으로 실행되었습니다.' });
//     }
//   });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;
const fs = require('fs');
const path = require('path');
const maindb = require('./maindb.js');
const { exec } = require('child_process'); // child_process 모듈을 추가하여 외부 스크립트 실행
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));

const session = require('express-session');
const sessionOption = require('./sessionOption');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))


app.get('/authcheck', (req, res) => {      
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" };

    if (username && password) {             // id와 pw가 입력되었는지 확인
        maindb.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      

                bcrypt.compare(password , results[0].password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교

                    if (result === true) {                  // 비밀번호가 일치하면
                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.nickname = username;
                        req.session.save(function () {
                            sendData.isLogin = "True"
                            res.send(sendData);
                        });
                        maindb.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                            , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                    }
                    else{                                   // 비밀번호가 다른 경우
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                        res.send(sendData);
                    }
                })                      
            } else {    // db에 해당 아이디가 없는 경우
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});

app.post("/signin", (req, res) => {  // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;
    
    const sendData = { isSuccess: "" };

    if (username && password && password2) {
        maindb.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
                const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
                maindb.query('INSERT INTO userTable (username, password) VALUES(?,?)', [username, hasedPassword], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {                        
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우                  
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
                res.send(sendData);
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);  
    }
    
});

const multer = require('multer');
const upload = multer({ 
  dest: './upload',
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});
const maskDir = path.join(__dirname, 'mask');

app.get('/api/main', (req, res) => {
    maindb.query(
        "SELECT * FROM IMAGEBOARD WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('../inference/img'));
app.use('/inpainted', express.static('../inference/res'));
app.use('/mask', express.static('../inference/mask'));

app.post('/api/main', upload.single('image'), (req, res) => {
    let imageExtension = req.file.originalname.split('.').pop();
    let imageName = req.body.name + '.' + imageExtension;
    let imagePath = '/image/' + imageName;
    let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, null, ?,? ,now(), 0,null)';
    let params = [imagePath,req.body.name, req.body.explanation];
    
    fs.renameSync(req.file.path, path.join(__dirname, '..', 'inference', 'img', imageName));
    
    maindb.query(sql, params,
        (err, rows, fields) => {
            if (err) {
                console.error('이미지 저장 실패:', err);
                res.status(500).send('이미지 저장에 실패했습니다.');
            } else {
                res.send(rows);
            }
        }
    );
});

app.delete('/api/main/:id', (req, res) => {
    let sql = 'UPDATE IMAGEBOARD SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    maindb.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/saveImage', (req, res) => {
  const imageDataURL = req.body.imageDataURL;
  const base64Data = imageDataURL.replace(/^data:image\/png;base64,/, '');
  const maskImageName =  req.body.imageName + '.png'; 

  fs.writeFile(path.join(__dirname,'..', 'inference', 'mask', maskImageName), base64Data, 'base64', (err) => {
    if (err) {
      console.error('이미지 저장 실패:', err);
      res.status(500).send('이미지 저장에 실패했습니다.');
    } else {
      const maskImagePath = '/mask/' + maskImageName;
      console.log(maskImagePath);
      const imageName = req.body.imageName; 

      maindb.query(
        'UPDATE IMAGEBOARD SET mask = ? WHERE name = ?',
        [maskImagePath, imageName],
        (error, results) => {
          if (error) {
            console.error('데이터베이스 업데이트 실패:', error);
            res.status(500).send('데이터베이스 업데이트에 실패했습니다.');
          } else {
            res.send({ maskImagePath });
          }
        }
      );
    }
  });
});


// Inpainting 스크립트 실행 요청 처리
app.get('/api/runInpaintingScript', (req, res) => {
  const inpaintingType = req.query.type; // 클라이언트에서 전달한 Inpainting 타입
  console.log(inpaintingType);
  exec(`/Users/jeong-yeongjin/HUFS-BME-AI-WEB/HUFS-BME-AI-WEB/AI/inference/run.sh ${inpaintingType}`, (error, stdout, stderr) => {
    if (error) {
      console.error('스크립트 실행 실패:', error);
      res.status(500).send('Inpainting 스크립트 실행에 실패했습니다.');
    } else {
      console.log('스크립트 실행 결과:', stdout);
      res.send({ message: 'Inpainting 스크립트가 성공적으로 실행되었습니다.' });
    }
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
