import React from 'react';

import WelcomeHeader from '../../components/PersonalHome/WelcomeHeader.jsx';
import BurnoutOverview from '../../components/PersonalHome/BurnoutOverview.jsx';
import TestButton from '../../components/PersonalHome/TestButton.jsx';
import DailyReflection from "../../components/PersonalHome/DailyReflection.jsx";

import '../../styles/PersonalHome.css';

function PersonalHome() {
  return (
    <div className="personal-home">

      {/* Welcome */}
      <WelcomeHeader />

      {/* Main overview */}
      <div className="personal-home-main">
        <BurnoutOverview />
        <TestButton />
      </div>

      {/* Bottom section */}
      <div className="personal-home-bottom">
         <DailyReflection />
        
        
      </div>

    </div>
  );
}

export default PersonalHome;