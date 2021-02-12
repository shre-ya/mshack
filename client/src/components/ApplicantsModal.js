import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import './Notification.css';
import ApplicantsCards from './ApplicantsCards';
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

export default function Applicants(props) {
    var applicants_list = [];
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [app, setApp] = React.useState([]);

    const handleOpen = async () => {
        setOpen(true);
        applicants_list = await axios.get(`${process.env.PUBLIC_URL}/api/applicants`);
        applicants_list = applicants_list.data.applicants;
        setApp(applicants_list);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        props.deleteJobHandler();
        handleClose();
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            {
                app.map(item => (
                    <ApplicantsCards person={item} />
                ))
            }
        </div>
    );

    return (
        <div>
            <button className="buttonH" onClick={handleOpen}>Applicants</button>
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