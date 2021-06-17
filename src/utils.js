export function extractLaunchParams() {
  if (window.launchParams) {
    return JSON.parse(window.launchParams);
  } else {
    return {};
  }
}

export function handleLaunch(params) {
  const { contentTarget } = params;

  if (contentTarget && typeof contentTarget === 'string') {
    if (contentTarget.indexOf('https://www.youtube.com/tv?') === 0) {
      console.info('Launching from direct contentTarget:', contentTarget);
      window.location = contentTarget;
    } else {
      console.info('Launching from partial contentTarget:', contentTarget);
      window.location = 'https://www.youtube.com/tv#?' + contentTarget;
    }
  } else {
    console.info('Default launch');
    window.location = 'https://www.youtube.com/tv';
  }
}
