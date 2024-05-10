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
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;
const fs = require('fs');
const path = require('path');
const maindb = require('./maindb.js');


const { PythonShell } = require('python-shell');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(bodyParser.json({ limit: '10mb' })); // 페이로드 크기 제한

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

app.get('/api/main', (req,res) => {
    maindb.query(
        "SELECT * FROM IMAGEBOARD WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload'));

app.post('/api/main', upload.single('image'), (req,res) => {
    let imageExtension = req.file.originalname.split('.').pop(); // 파일 확장자 추출
    let imageName = req.body.name + '.' + imageExtension; // 입력한 이미지 이름에 확장자 추가
    let imagePath = '/image/' + imageName; // 이미지 경로 생성
    let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, ?, ?,? ,now(), 0,null)';
    let params = [imagePath, ' ', req.body.name, req.body.explanation];
    
    fs.renameSync(req.file.path, path.join(__dirname, 'upload', imageName)); // 파일 이름 변경 및 이동
    
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
  const maskImageName = 'mask_' + req.body.imageName + '.png'; // 고유한 파일명 생성

  fs.writeFile(path.join(maskDir, maskImageName), base64Data, 'base64', (err) => {
    if (err) {
      console.error('이미지 저장 실패:', err);
      res.status(500).send('이미지 저장에 실패했습니다.');
    } else {
      const maskImagePath = '/mask/' + maskImageName;
      const imageName = req.body.imageName; // 클라이언트에서 이미지 ID를 받아옵니다.
      

      // 데이터베이스에 mask 이미지 경로 저장
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


app.listen(port, () => console.log(`Listening on port ${port}`));

