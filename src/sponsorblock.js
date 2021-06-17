import sha256 from 'tiny-sha256';
import {configRead} from './config';
<<<<<<< HEAD

// Copied from https://github.com/ajayyy/SponsorBlock/blob/9392d16617d2d48abb6125c00e2ff6042cb7bebe/src/config.ts#L179-L233
const barTypes = {
    "preview-chooseACategory": {
        color: "#ffffff",
        opacity: "0.7"
    },
    "sponsor": {
        color: "#00d400",
        opacity: "0.7"
    },
    "preview-sponsor": {
        color: "#007800",
        opacity: "0.7"
    },
    "intro": {
        color: "#00ffff",
        opacity: "0.7"
    },
    "preview-intro": {
        color: "#008080",
        opacity: "0.7"
    },
    "outro": {
        color: "#0202ed",
        opacity: "0.7"
    },
    "preview-outro": {
        color: "#000070",
        opacity: "0.7"
    },
    "interaction": {
        color: "#cc00ff",
        opacity: "0.7"
    },
    "preview-interaction": {
        color: "#6c0087",
        opacity: "0.7"
    },
    "selfpromo": {
        color: "#ffff00",
        opacity: "0.7"
    },
    "preview-selfpromo": {
        color: "#bfbf35",
        opacity: "0.7"
    },
    "music_offtopic": {
        color: "#ff9900",
        opacity: "0.7"
    },
    "preview-music_offtopic": {
        color: "#a6634a",
        opacity: "0.7"
    }
};

class SponsorBlockHandler {
  constructor(videoID, video) {
    this.videoID = videoID;
    this.video = video;
    this.active = true;
=======
import {showNotification} from './ui';

// Copied from https://github.com/ajayyy/SponsorBlock/blob/9392d16617d2d48abb6125c00e2ff6042cb7bebe/src/config.ts#L179-L233
const barTypes = {
  "sponsor": {
    color: "#00d400",
    opacity: "0.7",
    name: "sponsored segment",
  },
  "intro": {
    color: "#00ffff",
    opacity: "0.7",
    name: "intro",
  },
  "outro": {
    color: "#0202ed",
    opacity: "0.7",
    name: "outro",
  },
  "interaction": {
    color: "#cc00ff",
    opacity: "0.7",
    name: "interaction reminder",
  },
  "selfpromo": {
    color: "#ffff00",
    opacity: "0.7",
    name: "self-promotion",
  },
  "music_offtopic": {
    color: "#ff9900",
    opacity: "0.7",
    name: "non-music part",
  },
};

class SponsorBlockHandler {
  video = null;
  active = true;

  attachVideoTimeout = null;
  nextSkipTimeout = null;
  sliderInterval = null;

  observer = null;
  scheduleSkipHandler = null;
  durationChangeHandler = null;
  segments = null;

  constructor(videoID) {
    this.videoID = videoID;
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
  }

  async init() {
    const videoHash = sha256(this.videoID).substring(0, 4);
    const categories = ["sponsor", "intro", "outro", "interaction", "selfpromo", "music_offtopic"];
    const resp = await fetch(`https://sponsor.ajay.app/api/skipSegments/${videoHash}?categories=${encodeURIComponent(JSON.stringify(categories))}`);
    const results = await resp.json();

    const result = results.find((v) => v.videoID === this.videoID);
    console.info(this.videoID, 'Got it:', result);

    if (!result || !result.segments || !result.segments.length) {
      console.info(this.videoID, 'No segments found.');
      return;
    }

    this.segments = result.segments;

<<<<<<< HEAD
    console.info(this.videoID, 'Video found, binding...');

    this.scheduleSkipHandler = () => this.scheduleSkip();
    this.durationChangeHandler = () => this.buildOverlay();

=======
    this.scheduleSkipHandler = () => this.scheduleSkip();
    this.durationChangeHandler = () => this.buildOverlay();

    this.attachVideo();
    this.buildOverlay();
  }

  attachVideo() {
    clearTimeout(this.attachVideoTimeout);
    this.attachVideoTimeout = null;

    this.video = document.querySelector('video');
    if (!this.video) {
      console.info(this.videoID, 'No video yet...');
      this.attachVideoTimeout = setTimeout(() => this.attachVideo(), 100);
      return;
    }

    console.info(this.videoID, 'Video found, binding...');

>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
    this.video.addEventListener('play', this.scheduleSkipHandler);
    this.video.addEventListener('pause', this.scheduleSkipHandler);
    this.video.addEventListener('timeupdate', this.scheduleSkipHandler);
    this.video.addEventListener('durationchange', this.durationChangeHandler);
<<<<<<< HEAD

    this.buildOverlay();
=======
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
  }

  buildOverlay() {
    if (this.segmentsoverlay) {
      console.info('Overlay already built');
      return;
    }

<<<<<<< HEAD
    if (!this.video.duration) {
=======
    if (!this.video || !this.video.duration) {
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
      console.info('No video duration yet');
      return;
    }

    const videoDuration = this.video.duration;

    this.segmentsoverlay = document.createElement('div');
    this.segments.forEach(segment => {
      const [start, end] = segment.segment;
      const barType = barTypes[segment.category] || { color: 'blue', opacity: 0.7};
      const transform = `translateX(${start / videoDuration * 100.0}%) scaleX(${(end-start) / videoDuration})`;
      const elm = document.createElement('div')
      elm.classList.add('ytlr-progress-bar__played');
      elm.style['background'] = barType.color;
      elm.style['opacity'] = barType.opacity;
      elm.style['-webkit-transform'] = transform;
      console.info('Generated element', elm, 'from', segment, transform);
      this.segmentsoverlay.appendChild(elm);
    });

    this.observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((m) => {
        if (m.removedNodes) {
          m.removedNodes.forEach(n => {
            if (n === this.segmentsoverlay) {
              console.info('bringing back segments overlay');
              this.slider.appendChild(this.segmentsoverlay);
            }
          });
        }
      })
    });

    this.sliderInterval = setInterval(() => {
      this.slider = document.querySelector('.ytlr-progress-bar__slider');
      if (this.slider) {
        clearInterval(this.sliderInterval);
        this.sliderInterval = null;
        this.observer.observe(this.slider, {
          childList: true,
        });
        this.slider.appendChild(this.segmentsoverlay);
      }
    }, 500);
  }

  scheduleSkip() {
<<<<<<< HEAD
    clearTimeout(this.nextSkip);
    this.nextSkip = null;
=======
    clearTimeout(this.nextSkipTimeout);
    this.nextSkipTimeout = null;
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a

    if (!this.active) {
      console.info(this.videoID, 'No longer active, ignoring...');
      return;
    }

    if (this.video.paused) {
      console.info(this.videoID, 'Currently paused, ignoring...');
      return;
    }

    // Sometimes timeupdate event (that calls scheduleSkip) gets fired right before
    // already scheduled skip routine below. Let's just look back a little bit
    // and, in worst case, perform a skip at negative interval (immediately)...
<<<<<<< HEAD
    const nextSegments = this.segments.filter(seg => seg.segment[0] > this.video.currentTime - 0.1 && seg.segment[1] > this.video.currentTime - 0.1);
=======
    const nextSegments = this.segments.filter(seg => seg.segment[0] > this.video.currentTime - 0.3 && seg.segment[1] > this.video.currentTime - 0.3);
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
    nextSegments.sort((s1, s2) => s1.segment[0] - s2.segment[0]);

    if (!nextSegments.length) {
      console.info(this.videoID, 'No more segments');
      return;
    }

<<<<<<< HEAD
    const [start, end] = nextSegments[0].segment;
    console.info(this.videoID, 'Scheduling skip of', nextSegments[0], 'in', start - this.video.currentTime);

    this.nextSkip = setTimeout(() => {
=======
    const [segment] = nextSegments;
    const [start, end] = segment.segment;
    console.info(this.videoID, 'Scheduling skip of', segment, 'in', start - this.video.currentTime);

    this.nextSkipTimeout = setTimeout(() => {
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
      if (this.video.paused) {
        console.info(this.videoID, 'Currently paused, ignoring...');
        return;
      }

<<<<<<< HEAD
      console.info(this.videoID, 'Skipping', nextSegments[0]);
=======
      const skipName = barTypes[segment.category]?.name || segment.category;
      console.info(this.videoID, 'Skipping', segment);
      showNotification(`Skipping ${skipName}`);
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
      this.video.currentTime = end;
      this.scheduleSkip();
    }, (start - this.video.currentTime) * 1000);
  }

  destroy() {
    console.info(this.videoID, 'Destroying');

    this.active = false;

<<<<<<< HEAD
    if (this.nextSkip) {
      clearTimeout(this.nextSkip);
      this.nextSkip = null;
=======
    if (this.nextSkipTimeout) {
      clearTimeout(this.nextSkipTimeout);
      this.nextSkipTimeout = null;
    }

    if (this.attachVideoTimeout) {
      clearTimeout(this.attachVideoTimeout);
      this.attachVideoTimeout = null;
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
    }

    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.segmentsoverlay) {
      this.segmentsoverlay.remove();
      this.segmentsoverlay = null;
    }

<<<<<<< HEAD
    this.video.removeEventListener('play', this.scheduleSkipHandler);
    this.video.removeEventListener('pause', this.scheduleSkipHandler);
    this.video.removeEventListener('timeupdate', this.scheduleSkipHandler);
    this.video.removeEventListener('durationchange', this.durationChangeHandler);
=======
    if (this.video) {
      this.video.removeEventListener('play', this.scheduleSkipHandler);
      this.video.removeEventListener('pause', this.scheduleSkipHandler);
      this.video.removeEventListener('timeupdate', this.scheduleSkipHandler);
      this.video.removeEventListener('durationchange', this.durationChangeHandler);
    }
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
  }
}

// When this global variable was declared using let and two consecutive hashchange
// events were fired (due to bubbling? not sure...) the second call handled below
// would not see the value change from first call, and that would cause multiple
// SponsorBlockHandler initializations... This has been noticed on Chromium 38.
// This either reveals some bug in chromium/webpack/babel scope handling, or
// shows my lack of understanding of javascript. (or both)
window.sponsorblock = null;

window.addEventListener("hashchange", (evt) => {
  const newURL = new URL(location.hash.substring(1), location.href);
  const videoID = newURL.searchParams.get('v');
  const needsReload = videoID && (!window.sponsorblock || window.sponsorblock.videoID != videoID);

  console.info('hashchange', videoID, window.sponsorblock, window.sponsorblock ? window.sponsorblock.videoID : null, needsReload);

  if (needsReload) {
    if (window.sponsorblock) {
      try {
        window.sponsorblock.destroy();
      } catch (err) {
        console.warn('window.sponsorblock.destroy() failed!', err);
      }
      window.sponsorblock = null;
    }

    if (configRead('enableSponsorBlock')) {
<<<<<<< HEAD
      const video = document.querySelector('video');
      window.sponsorblock = new SponsorBlockHandler(videoID, video);
=======
      window.sponsorblock = new SponsorBlockHandler(videoID);
>>>>>>> 4f8fc37d8b92b95c5268297838f0bbae1bce189a
      window.sponsorblock.init();
    } else {
      console.info('SponsorBlock disabled, not loading');
    }
  }
}, false);
