// import React from 'react';
// import TableRow from '@mui/material/TableRow'
// import TableCell from '@mui/material/TableCell'
// import DataDelete from './DataDelete';

// class Customer extends React.Component{
//     handleImageClick = () => {
//         // 이미지 URL을 props로 받아와서 새 창으로 이미지 보기
//         window.open(this.props.image, '_blank');
//     };
//     render() { //render는 항상 수행되는 함수 
//         return(
//             <TableRow>
//                 <TableCell>{this.props.id}</TableCell>
//                 <TableCell ><img src={this.props.image} alt='profile' width='200' /></TableCell>
//                 <TableCell><img src={this.props.inpainted} alt='profile'/></TableCell>
//                 <TableCell>{this.props.name}</TableCell>
//                 <TableCell>{this.props.explanation}</TableCell>
//                 <TableCell><DataDelete stateRefresh ={this.props.stateRefresh} id={this.props.id}/></TableCell>
//             </TableRow>
//         )
//     }
// }

// export default Customer;

import React, { useState } from 'react';
import { TableCell, TableRow, Dialog, DialogContent, DialogTitle } from '@mui/material';
import DataDelete from './DataDelete'; // DataDelete 컴포넌트가 정의된 경로로 수정 필요

const Customer = (props) => {
    const [open, setOpen] = useState(false);

    // 모달 열기
    const handleOpen = () => {
        setOpen(true);
    };

    // 모달 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell onClick={handleOpen}>
                <img src={props.image} alt='profile' width='200' />
            </TableCell>
            <TableCell>
                <img src={props.inpainted} alt='profile'/>
            </TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.explanation}</TableCell>
            <TableCell>
                <DataDelete stateRefresh={props.stateRefresh} id={props.id}/>
            </TableCell>

            
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Original Image</DialogTitle>
                <DialogContent>
                    <img src={props.image} alt='profile' width='100%' />
                </DialogContent>
            </Dialog>
        </TableRow>
    );
};

export default Customer;
