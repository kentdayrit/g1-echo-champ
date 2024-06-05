import './HighScoreOffCanvaList.css';
import React, { useState, useEffect } from 'react';
import { getUsersByScore  } from '../../configs/firebase';


const HighScoreOffCanvaList = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);

  const fetchTopUsers = async () => {
    setIsLoading(true); 
    setError(null);

    try {
      const data = await getUsersByScore();
      const mappedUsers = Object.entries(data.users).map(([userId, userData], index) => ({
        ...userData,
        id: userId,
        rank: index +1
      }));

      setTopUsers(mappedUsers);
    } catch (err) {
      console.error('Error fetching top users:', err);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
  }, []);


  return (
    <ul className="ranked-list">
        <li>
          <span className="rank-number">RANK</span>
          <span className="username">USERNAME</span>
          <span className="rank-number">SCORE</span>
        </li>
      {isLoading ? ( 
        <li>Loading top scores...</li>
      ) : error ? (
        <li className="error-message">{error}</li>
      ) : topUsers.length === 0 ? (
        <li className='username'>No top scores available yet.</li>
      ) : (
        topUsers.map((user) => (
          <li key={user.id || user.username}>
            <span className="rank-number">{user.rank}</span>
            <span className="username">{user.username}</span>
            <span className="rank-number">{user.score}</span>
          </li>
        ))
      )}
    </ul>
  );
};

export default HighScoreOffCanvaList;
