import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DataDelete from './DataDelete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Canvas from './Canvas';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasVisible: false,
      backgroundImage: null,
      imageWidth: 0,
      imageHeight: 0,
      selectedImageName: null, // 선택된 이미지의 ID를 저장할 상태를 추가합니다.
    };
  }

  showCanvas = (image, width, height, name) => {
    this.setState({
      canvasVisible: true,
      backgroundImage: image,
      imageWidth: width,
      imageHeight: height,
      selectedImageName: name, // 이미지 ID를 상태에 저장합니다.
    });
  };

  handleClose = () => {
    this.setState({ canvasVisible: false });
  };

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img
            src={this.props.image}
            alt="profile"
            onClick={(e) =>
              this.showCanvas(
                this.props.image,
                e.target.naturalWidth,
                e.target.naturalHeight,
                this.props.name // 이미지 ID를 전달합니다.
              )
            }
            width='200'
          />
        </TableCell>
        <TableCell>
          <img src={this.props.inpainted} alt='profile'/>
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.explanation}</TableCell>
        <TableCell>
          <DataDelete
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
          />
        </TableCell>
        <Dialog
          open={this.state.canvasVisible}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            {"Draw on Image"}
          </DialogTitle>
          <DialogContent>
            <Canvas
              backgroundImage={this.state.backgroundImage}
              imageWidth={this.state.imageWidth}
              imageHeight={this.state.imageHeight}
              imageName={this.state.selectedImageName} // 이미지 Name를 전달합니다.
              updateMaskImage={this.props.stateRefresh} // 캔버스에서 마스크 이미지를 저장할 때 필요한 콜백 함수를 전달합니다.
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </TableRow>
    );
  }
}

export default Customer;

