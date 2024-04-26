import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupList from './GroupList';
import './App.css'; 

const App = () => {
  const [groups, setGroups] = useState([{ from: 1, to: 10 }]);
  const [statuses, setStatuses] = useState([]);
  const [showStatuses, setShowStatuses] = useState(false); 
  const [showGroups, setShowGroups] = useState(false); 

  const addGroup = () => {
   
    let fromInput = prompt("Enter 'from' value for the new group:");
    
    
    if (fromInput === null) {
      return; 
    }
  
    let from = parseInt(fromInput);
    if (isNaN(from) || from < 1 || from > 10) {
      alert("Please enter a valid 'from' value within the range 1 - 10");
      return;
    }
  
    let toInput = prompt("Enter 'to' value for the new group:");
    
   
    if (toInput === null) {
      return; 
    }
  
    let to = parseInt(toInput);
    if (isNaN(to) || to < from || to > 10) {
      alert(`Please enter a valid 'to' value within the range ${from} - 10`);
      return;
    }
  
    const existingNumbers = new Set();
    groups.forEach(group => {
      for (let i = group.from; i <= group.to; i++) {
        existingNumbers.add(i);
      }
    });
  
    for (let i = from; i <= to; i++) {
      if (existingNumbers.has(i)) {
        alert(`Number ${i} is already covered by an existing group.`);
        return;
      }
    }
  
   
    const sortedGroups = [...groups, { from, to }].sort((a, b) => a.from - b.from);
    for (let i = 0; i < sortedGroups.length - 1; i++) {
      if (sortedGroups[i].to !== sortedGroups[i + 1].from - 1) {
        alert('There should not be any gaps between consecutive groups');
        return;
      }
    }
  
   
    for (let i = 0; i < sortedGroups.length - 1; i++) {
      if (sortedGroups[i].to >= sortedGroups[i + 1].from) {
        alert('There should not be overlap between consecutive groups');
        return;
      }
    }
  
    const newGroup = { from, to };
    setGroups([...groups, newGroup]);
  };
  

  const deleteGroup = (index) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
  };

  const fetchGroupStatuses = async () => {
    const groupStatuses = [];
    for (const group of groups) {
      const statuses = await Promise.all(
        Array.from({ length: group.to - group.from + 1 }, (_, i) =>
          fetchTodoStatus(group.from + i)
        )
      );
      groupStatuses.push(statuses);
    }
    setStatuses(groupStatuses);
    setShowStatuses(true); 
    setShowGroups(true); 
  };

  const fetchTodoStatus = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return response.data.completed;
    } catch (error) {
      console.error('Error fetching todo status:', error);
      return false;
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List Groups</h1>
      <div className="button-container">
        <button className="action-button" onClick={addGroup}>Add Group</button>
        {!showStatuses && <button className="action-button" onClick={fetchGroupStatuses}>Show Status</button>}
      </div>
      {showGroups && <GroupList groups={groups} statuses={statuses} deleteGroup={deleteGroup} />}
    </div>
  );
};

export default App;
