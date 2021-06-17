import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './domrect-polyfill';

<<<<<<< HEAD
=======
import {handleLaunch} from './utils';

document.addEventListener('webOSRelaunch', (evt) => {
  console.info('RELAUNCH:', evt, window.launchParams);
  handleLaunch(evt.detail);
}, true);

>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
import './adblock.js';
import './sponsorblock.js';
import './ui.js';
