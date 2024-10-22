import React, { useState, useEffect, useRef } from 'react';
import '../styles/dropdown.css';
import displayIcon from '../icons/Display.svg'; 
import downArrowIcon from '../icons/down.svg';

const FilterDropdown = ({ setFilterType, setSortType }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [grouping, setGrouping] = useState('Status');
    const [ordering, setOrdering] = useState('Priority');
    const dropdownRef = useRef(null);

    const handleGroupingChange = (e) => {
        setGrouping(e.target.value);
        setFilterType(e.target.value);
    };

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value);
        setSortType(e.target.value);
    };

    const toggleDropdown = () => {
        setShowOptions(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="filters-container" ref={dropdownRef}>
            <div className="dropdown-wrapper" onClick={toggleDropdown}>
                <img src={displayIcon} alt="Display Icon" style={{ width: '20px', marginRight: '10px' }} />
                <span className="dropdown-title">Display</span>
                <img src={downArrowIcon} alt="Down Arrow" style={{ width: '15px', marginLeft: '5px' }} />
            </div>
            {showOptions && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <div style={{ display: 'flex', alignItems: 'center',color:"grey",fontWeight:500,fontSize:"14px",marginRight:"6px"}}>
                            Grouping
                        </div>
                        <select
                            className="dropdown-select"
                            value={grouping}
                            onChange={handleGroupingChange}
                        >
                            <option value="Status">Status</option>
                            <option value="Priority">Priority</option>
                            <option value="Assigned User">Assigned User</option>
                        </select>
                    </div>
                    <div className="dropdown-item">
                        <div style={{ display: 'flex', alignItems: 'center',color:"grey",fontWeight:500,fontSize:"14px" ,marginRight:"9px"}}>
                            Ordering
                        </div>
                        <select
                            className="dropdown-select"
                            value={ordering}
                            onChange={handleOrderingChange}
                        >
                            <option value="Priority">Priority</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
