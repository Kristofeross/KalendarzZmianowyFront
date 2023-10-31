import React, { useState, useEffect } from 'react';
// Pobieranie danych z API
import  {fetchItems}  from './api/fetchItems';

const UserDataGet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchItems();
        setData(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <div>User ID: {user.userId}</div>
            <div>ID: {user.id}</div>
            <div>Title: {user.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDataGet;
