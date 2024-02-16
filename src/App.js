import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [slideDown, setSlideDown] = useState(true);


  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then((response) => response.json())
      .then((data) => setUser(data.results[0]));
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDown(false);
    }, 0); // set the delay to 0 to make the animation start immediately

    return () => {
      clearTimeout(timer);
    }
  }, []);


  return (
    <div className={`App ${slideDown ? 'slide-down' : ''}`}>
      {user ? (
        <div className={`card ${slideDown ? 'card-slide-down' : ''}`}>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <div className="text">
              <h2>
                {user.name.first} {user.name.last}
              </h2>
              <p>{user.email}</p>
              <p>{user.location.city}, {user.location.country}</p>
            </div>
          </div>
        ) : (
          <p class="loading">loading....</p>
        )}
      </div>
  );
}

export default App;