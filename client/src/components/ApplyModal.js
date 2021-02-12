import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import './Notification.css';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    cross: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
}));

export default function Apply(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        props.apply();
        handleClose();
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div>
                <p style={{ color: "black" }}><b>Are you sure you want to Apply!</b></p>
                <div style={{ display: "flex", marginTop: "3rem", marginLeft: "6rem" }}>
                    <Button style={{ width: "3rem", backgroundColor: "#33b579", cursor: "pointer" }} onClick={handleClose}>No</Button>
                    <Button style={{ width: "3rem", marginLeft: "1.5rem", backgroundColor: "#e6e6e6", cursor: "pointer" }} onClick={handleSubmit}>Yes</Button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <button className="buttonH" style={{ backgroundColor: "rgb(179, 179, 179)", }} onClick={handleOpen}>{props.active === 0 ? "Apply" : "Applied"}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}