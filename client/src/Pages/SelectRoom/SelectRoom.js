import React from 'react';
import RoomList from '../../Components/SelectRoom/RoomList'


function createDate(roomName, isWait, isLocked, isFull) {
  return { roomName, isWait, isLocked, isFull };
}

const rows = [
  createDate('드루와', true, false, false),
  createDate('드루와라', false, true, true),
  createDate('야!타', true, true, true),
  createDate('늬 내가누군지아니?', false, false, true),
  createDate('매너겜좀합시다', true, false, false),
  createDate('6학녕1반', true, true, false),
  createDate('드루와', true, false, false),
  createDate('드루와', true, false, false),
  createDate('드루와', true, false, false),
]; 

const SelectRoom = () => {
  return (
    <div>
      {
        rows.map((row) => (
          <RoomList 
            roomName={row.roomName} 
            isWait={row.isWait}
            isLocked={row.isLocked}
            isFull={row.isFull}
          />
        ))
      }
    </div>
  );
};

export default SelectRoom;
