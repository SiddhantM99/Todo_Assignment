
import React from 'react';

const Group = ({ group, index, status, deleteGroup }) => {
  const { from, to } = group;

  const handleDelete = () => {
    deleteGroup(index);
  };

  return (
    <div>
      <span>Group {index + 1}: {from} - {to}</span>
      <br />
      {status && (
        <span>Status: True</span>
      )}
      {!status && (
        <span>Status: False</span>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Group;
