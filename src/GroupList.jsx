// GroupList.js
import React from 'react';
import Group from './Group';

const GroupList = ({ groups, statuses, deleteGroup }) => {
  return (
    <div>
      {groups.map((group, index) => (
        <Group key={index} group={group} index={index} status={statuses[index]} deleteGroup={deleteGroup} />
      ))}
    </div>
  );
};

export default GroupList;
