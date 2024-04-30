// const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var maindb = require('./maindb.js');


const multer = require('multer');
const upload = multer({dest: './upload'})
   
app.get('/api/main', (req,res) => {
    maindb.query(
        "SELECT * FROM IMAGEBOARD WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload')); //사용자에게 /image라는 폴더가 서버의 ./upload 라는 폴더로 연결된다.

app.post('/api/main', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, ?, ?,? ,now(), 0)';
    let image = '/image/' + req.file.filename;
    let inpainted = ' ';
    let name = req.body.name;
    let explanation= req.body.explanation;
    let params = [image, inpainted, name, explanation];
    maindb.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            // console.log(err); //로그를 찍어보면서 에러를 확인한다.
            // console.log(rows);
        }
    );
});

// app.post('/api/main', upload.array('image',2), (req,res) => {
//     let sql = 'INSERT INTO IMAGEBOARD VALUES (null, ?, ?, ?,? ,now(), 0)';
//     let image = '/image/' + req.files[0].filename;
//     let inpainted = '/image/' + 'inpainted_' + req.files[1].filename;
//     let imageName = req.body.imageName;
//     let explanation= req.body.explanation;
//     let params = [image, inpainted,imageName, explanation];
//     maindb.query(sql, params,
//         (err, rows, fields) => {
//             res.send(rows);
//         }
//     );
// });

app.delete('/api/main/:id', (req, res) => {
    let sql = 'UPDATE IMAGEBOARD SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    maindb.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));