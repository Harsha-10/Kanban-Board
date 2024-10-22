import React from 'react'
import { Card, Button } from 'react-bootstrap'; 
import high from '../icons/Img - High Priority.svg';
import low from '../icons/Img - Low Priority.svg';
import medium from '../icons/Img - Medium Priority.svg';
import ntg from '../icons/No-priority.svg';
import urgent from '../icons/SVG - Urgent Priority grey.svg';
import todo from "../icons/To-do.svg";
import inprogress from "../icons/in-progress.svg";
import done from "../icons/Done.svg";
import backlog from "../icons/Backlog.svg";
import cancelled from "../icons/Cancelled.svg";
import '../styles/card.css';
const card = ({data,sortBy}) => {
    const getPriority = (priority) => {
        switch (priority) {
            case 0:
                return <img src={ntg} alt="No Priority" />;
            case 1:
                return <img src={low} alt="Low Priority" />;
            case 2:
                return <img src={medium} alt="Medium Priority" />;
            case 3:
                return <img src={high} alt="High Priority" />;
            default:
                return <img src={urgent} alt="Urgent Priority" />;
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case "ToDo":
                return <img src={todo} alt="To Do" />;
            case "In progress":
                return <img src={inprogress} alt="In Progress" />;
            case "Backlog":
                return <img src={backlog} alt="Backlog" />;
            case "Done":
                return <img src={done} alt="Done" />;
            default:
                return <img src={cancelled} alt="Cancelled" />;
        }
    }
    return (
        <Card style={{ width: '18rem', border: '1px solid #e1e1e1', borderRadius: '8px', margin: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} className="card-box">
            <Card.Body style={{padding:'10px'}}>
                <div className="card-top">
                    <span style={{fontWeight: 500, color: '#7C7E7E' }}>{data.id}</span>
                    {sortBy !== 'assigned' && (
                        <span className="user-profile-wrapper">
                            <span className={`status-dot`}></span>
                        </span>
                    )}
                </div>
                <div className="card-heading" style={{ display: 'flex', alignItems: 'center' }}>
                    {sortBy !== 'Status'? getStatus(data.status):<></>}
                    <Card.Title style={{ fontWeight: 600, marginLeft: '8px' }}>{data.title}</Card.Title>
                </div>
                <div className="card-bottom">
                    <div>
                        {sortBy !== 'Priority'? getPriority(data.priority):<></>}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
export default card;