//eslint-disable-next-line
import React from 'react';
import { localShortcut } from 'electron-localshortcut';
import { remote, powerMonitor } from 'electron';

const Widget = () => {
    const [screenTime, setScreenTime] = React.useState(0);
  
    React.useEffect(() => {
      const win = remote.getCurrentWindow();
      let isIdle = false;
  
      const idleThreshold = 60 * 1000; // 1 minute
      let idleTimer = null;
  
      const handleUserActivity = () => {
        if (isIdle) {
          isIdle = false;
          clearInterval(idleTimer);
  
          // Resume screen time tracking
          // ...
        }
  
        // Reset the idle timer
        clearInterval(idleTimer);
        idleTimer = setInterval(() => {
          isIdle = true;
  
          // Pause screen time tracking
          // ...
        }, idleThreshold);
      };
  
      win.on('focus', handleUserActivity);
      win.on('mousemove', handleUserActivity);
      win.on('keydown', handleUserActivity);
  
      powerMonitor.on('resume', handleUserActivity);
  
      return () => {
        win.removeListener('focus', handleUserActivity);
        win.removeListener('mousemove', handleUserActivity);
        win.removeListener('keydown', handleUserActivity);
  
        powerMonitor.removeListener('resume', handleUserActivity);
  
        clearInterval(idleTimer);
      };
    }, []);
  
    React.useEffect(() => {
      const interval = setInterval(() => {
        setScreenTime((prevTime) => prevTime + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatScreenTime = (time) => {
      // Custom formatting logic for screen time
      const hours = Math.floor(time / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const handleContextMenu = (e) => {
      e.preventDefault();
  
      const menu = new remote.Menu();
      menu.append(new remote.MenuItem({
        label: 'Settings',
        click: () => {
          // Open settings window or dialog
        },
      }));
  
      menu.popup();
    };
  
    return (
      <div id="widget-container" onContextMenu={handleContextMenu}>
        <p>{formatScreenTime(screenTime)}</p>
      </div>
    );
  };
  
  export default Widget;
  