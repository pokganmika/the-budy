/**
 *
 * @param {string} linkUrl
 */
export default linkUrl => {
  const MEDIUM = 'medium';
  const FACEBOOK = 'facebook';
  const YOUTUBE = 'youtube';
  const TWITTER = 'twitter';

  if (linkUrl.toLowerCase().includes(MEDIUM)) {
    return 'medium';
  } else if (linkUrl.toLowerCase().includes(FACEBOOK)) {
    return 'facebook';
  } else if (linkUrl.toLowerCase().includes(YOUTUBE)) {
    return 'youtube';
  } else if (linkUrl.toLowerCase().includes(TWITTER)) {
    return 'twitter';
  } else {
    return 'etc';
  }
};
