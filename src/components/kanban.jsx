import React, { useState, useEffect } from 'react';
import { fetchTicketsData } from '../service/api';
import Card from "../components/card";
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
import FilterDropdown from './FilterDropdown'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/kanban.css'
const Kanban = () => {
    const statusOptions = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
    const priorityOptions = ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];
    const [data, setData] = useState({ tickets: [], users: [] });
    const [filterType, setFilterType] = useState('Status');
    const [sortType, setSortType] = useState('Priority');
    const [groupedData, setGroupedData] = useState({});

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "Urgent": return urgent;
            case "High": return high;
            case "Medium": return medium;
            case "Low": return low;
            case "No Priority": return ntg;
            default: return null;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Todo": return todo;
            case "In progress": return inprogress;
            case "Done": return done;
            case "Backlog": return backlog;
            case "Canceled": return cancelled;
            default: return null;
        }
    };

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const fetchedData = await fetchTicketsData();
                setData(fetchedData);
            } catch (error) {
                console.error('Failed to fetch tickets:', error);
            }
        };
        loadTickets();
    }, []);

    useEffect(() => {
        const groupTickets = () => {
            const groups = {};
            let groupKey = [];

            if (filterType === 'Status') {
                groupKey = statusOptions;
            } else if (filterType === 'Priority') {
                groupKey = priorityOptions;
            } else if (filterType === 'Assigned User') {
                const userMap = {};
                data.users.forEach(user => {
                    userMap[user.id] = user.name;
                });
                groupKey = [...new Set(data.tickets.map(ticket => userMap[ticket.userId]))];
            }

            groupKey.forEach(key => {
                groups[key] = [];
            });

            const priorityMapping = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

            data.tickets.forEach(ticket => {
                let key = '';
                if (filterType === 'Status') {
                    key = ticket.status;
                } else if (filterType === 'Priority') {
                    key = priorityMapping[ticket.priority];
                } else if (filterType === 'Assigned User') {
                    const assignedUserName = data.users.find(user => user.id === ticket.userId)?.name;
                    key = assignedUserName;
                }

                if (key && key in groups) {
                    groups[key].push(ticket);
                }
            });

            Object.keys(groups).forEach(group => {
                groups[group].sort((a, b) => {
                    if (sortType === 'Priority') {
                        return b.priority - a.priority;
                    } else if (sortType === 'Title') {
                        return a.title.localeCompare(b.title);
                    }
                    return 0;
                });
            });

            setGroupedData(groups);
        };

        groupTickets();
    }, [data, filterType, sortType]);

    return (
        <div>
            <div className="kanban-header">
                <h2 className="kanban-title">Kanban Board</h2>
                <a href="https://github.com/harsha-10" target="_blank" rel="noopener noreferrer">
                    <div className="github-logo">H</div>
                </a>
            </div>
            <FilterDropdown setFilterType={setFilterType} setSortType={setSortType} />
            
            <div className="tickets-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                {Object.entries(groupedData).map(([group, tickets]) => (
                    <div 
                        key={group} 
                        className="cards" 
                        style={{ 
                            flex: '1 0 20%', 
                            margin: '10px', 
                            backgroundColor: '#f9f9f9', 
                            border: '1px solid #e1e1e1', 
                            borderRadius: '5px', 
                            padding: '10px',
                            minHeight: '200px', 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterType === 'Status' && <img src={getStatusIcon(group)} alt="icon" style={{ width: '20px', marginRight: '10px' }} />}
                            {filterType === 'Priority' && <img src={getPriorityIcon(group)} alt="icon" style={{ width: '20px', marginRight: '10px' }} />}
                            <h3 style={{ margin: 0 }}>{group}</h3>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {tickets.length === 0 ? (
                                <p style={{ color: '#999' }}>No tickets available</p>
                            ) : (
                                <TransitionGroup>
                                    {tickets.map(ticket => (
                                        <CSSTransition key={ticket.id} timeout={500} classNames="card">
                                            <Card data={ticket} sortBy={filterType} />
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                    .card-enter {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    .card-enter-active {
                        opacity: 1;
                        transform: translateY(0);
                        transition: opacity 500ms, transform 500ms;
                    }
                    .card-exit {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .card-exit-active {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 500ms, transform 500ms;
                    }
                `}
            </style>
        </div>
    );
};

export default Kanban;
