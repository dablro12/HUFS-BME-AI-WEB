import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

class DataDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            open: false
        });
    }
    
    deleteData(id) {
        const url = '/api/main/' + id; //리액트에서는 주소에 아이디 값을 더한 주소로 데이터에 접근할 수 있다.
        fetch(url,{
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        <Typography gutterBottom>
                            선택한 이미지 정보가 삭제됩니다.
                        </Typography>
                    </DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteData(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>취소</Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}

export default DataDelete;