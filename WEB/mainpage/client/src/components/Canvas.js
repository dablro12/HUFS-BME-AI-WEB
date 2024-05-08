// import React, { Component } from 'react';

// class Canvas extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       penWidth: 5,
//       isDrawing: false,
//       lastX: 0,
//       lastY: 0,
//     };
//     this.canvasRef = React.createRef();
//   }

//   componentDidMount() {
//     this.initializeCanvas();
//   }

//   initializeCanvas = () => {
//     const canvas = this.canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     canvas.width = this.props.imageWidth;
//     canvas.height = this.props.imageHeight;

//     const backgroundImage = new Image();
//     backgroundImage.src = this.props.backgroundImage;
//     backgroundImage.onload = () => {
//       ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//     };

//     canvas.addEventListener('mousedown', this.handleMouseDown);
//     canvas.addEventListener('mousemove', this.handleMouseMove);
//     canvas.addEventListener('mouseup', this.handleMouseUp);
//     canvas.addEventListener('mouseout', this.handleMouseOut);
//   };

//   handleMouseDown = (e) => {
//     this.startDrawing(e);
//   };

//   handleMouseMove = (e) => {
//     this.draw(e);
//   };

//   handleMouseUp = () => {
//     this.stopDrawing();
//   };

//   handleMouseOut = () => {
//     this.stopDrawing();
//   };

//   startDrawing = (e) => {
//     const canvas = this.canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const { penWidth } = this.state;

//     ctx.lineWidth = penWidth;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'rgba(0, 128, 0, 0.5)'; // 반투명한 초록색
//     ctx.globalAlpha = 0.7; // 투명도 설정
//     ctx.beginPath();

//     this.setState({
//       isDrawing: true,
//       lastX: e.offsetX,
//       lastY: e.offsetY,
//     });

//     ctx.moveTo(e.offsetX, e.offsetY);
//   };

//   draw = (e) => {
//     const { isDrawing, lastX, lastY } = this.state;
//     if (!isDrawing) return;

//     const canvas = this.canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();

//     this.setState({
//       lastX: e.offsetX,
//       lastY: e.offsetY,
//     });

//     // 새로운 선을 시작
//     ctx.beginPath();
//     ctx.moveTo(e.offsetX, e.offsetY);
//   };

//   stopDrawing = () => {
//     this.setState({ isDrawing: false });
//   };

//   clearDrawing = () => {
//     const canvas = this.canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     this.initializeCanvas();
//   };

//   setPenWidth = (width) => {
//     this.setState({ penWidth: width });
//   };

//   render() {
//     return (
//       <div>
//         <canvas
//           ref={this.canvasRef}
//           style={{ border: '1px solid #000' }}
//         ></canvas>
//         <div style={{ marginTop: '10px' }}>
//           <button onClick={this.clearDrawing}>Clear Drawing</button>
//           <input
//             type="number"
//             min="1"
//             max="100"
//             value={this.state.penWidth}
//             onChange={(e) => this.setPenWidth(e.target.value)}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default Canvas;

import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      penWidth: 5,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      canvasImage: null,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.initializeCanvas();
  }

  initializeCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = this.props.imageWidth;
    canvas.height = this.props.imageHeight;

    const backgroundImage = new Image();
    backgroundImage.src = this.props.backgroundImage;
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener('mousedown', this.handleMouseDown);
    canvas.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('mouseup', this.handleMouseUp);
    canvas.addEventListener('mouseout', this.handleMouseOut);
  };

  handleMouseDown = (e) => {
    this.startDrawing(e);
  };

  handleMouseMove = (e) => {
    this.draw(e);
  };

  handleMouseUp = () => {
    this.stopDrawing();
  };

  handleMouseOut = () => {
    this.stopDrawing();
  };

  startDrawing = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { penWidth } = this.state;

    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(0, 128, 0, 0.5)'; // 반투명한 초록색
    ctx.globalAlpha = 0.7; // 투명도 설정
    ctx.beginPath();

    this.setState({
      isDrawing: true,
      lastX: e.offsetX,
      lastY: e.offsetY,
    });

    ctx.moveTo(e.offsetX, e.offsetY);
  };

  draw = (e) => {
    const { isDrawing, lastX, lastY } = this.state;
    if (!isDrawing) return;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    this.setState({
      lastX: e.offsetX,
      lastY: e.offsetY,
    });

    // 새로운 선을 시작
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  stopDrawing = () => {
    this.setState({ isDrawing: false });
  };

  clearDrawing = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.initializeCanvas();
  };

  setPenWidth = (width) => {
    this.setState({ penWidth: width });
  };

  saveImage = () => {
    const canvas = this.canvasRef.current;
    const imageDataURL = canvas.toDataURL('image/png');
    axios.post('/api/saveImage', { imageDataURL })
      .then((response) => {
        const maskImagePath = response.data.maskImagePath;
        this.props.updateMaskImage(maskImagePath);
        alert('이미지가 성공적으로 저장되었습니다.');
      })
      .catch((error) => {
        console.error('이미지 저장 실패:', error);
      });
  };

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          style={{ border: '1px solid #000' }}
        ></canvas>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" onClick={this.clearDrawing}>그림 지우기</Button>
          <Button variant="contained" onClick={this.saveImage}>저장</Button>
          <input
            type="number"
            min="1"
            max="100"
            value={this.state.penWidth}
            onChange={(e) => this.setPenWidth(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default Canvas;
