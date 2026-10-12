import React from 'react';
import '../../styles/LoadingScreen.css';
import spinner from '../../assets/logo/Spinner.gif';

const Loading = ({ done }) => {
  const text = "EquiliMind".split("");

  return (
    <div className={`loading-container ${done ? "hide" : ""}`}>
      <div className={`content ${done ? "done" : ""}`}>
        <img src={spinner} alt="loading" className="spinner" />

        <h1>
          {text.map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Loading;