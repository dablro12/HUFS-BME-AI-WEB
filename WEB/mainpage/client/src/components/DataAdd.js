import React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




class DataAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            changedFile : null,
            imageName: '',
            explanation: '',
            fileName: '',
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState ({
            file: null,
            changedFile : null,
            imageName: '',
            explanation: '',
            fileName: '',
            open: false
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault() // 데이터가 서버로 전달됨에 있어서 오류가 발생하지 않도록 해주는 함수 
        this.addData()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState ({
            file: null,
            changedFile : null,
            imageName: '',
            explanation: '',
            fileName: '',
            open: false
        })
        // window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //file들 중에서 첫번째 요소 즉, 0번쨰 index에 있는 값을 받아온다.
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; 
        this.setState(nextState);
    }

    addData = () => {
        const url = '/api/main';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.imageName);
        formData.append('explanation', this.state.explanation);
        const config = {
            header: {
                'content-type': 'multipart/form-data' //데이터를 전달할때 파일 형식이 있을 때 선언해주는 형식
            }
        }
        return axios.post(url, formData, config);
    }

    render() {
        const{ classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Upload Image 
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogContent>
                        <input style={{ display: 'none' }} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <br/>
                        <TextField label="이미지 이름" type="text" name="imageName" value={this.state.imageName} onChange={this.handleValueChange}/><br/><br/>
                        <TextField label="설명" name="explanation" value={this.state.explanation} onChange={this.handleValueChange}/><br/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>업로드</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>

            </div>

        )
    }
}

export default DataAdd;