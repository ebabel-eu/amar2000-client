import React from 'react';

import './splashscreen.scss';

export default function SplashScreen() {
  return (
    <div className="splashloader safe">
      <div className="outer-circle">
        <div className="circle">
          <div className="text">
            <h1>AMAR <span className="addition">2000</span></h1>
            <p className="condition">Everything <br /> is okay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
