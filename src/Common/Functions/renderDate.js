import moment from 'moment';

const transformDate = (type, createdAt) => {
  const pastDate = moment(createdAt, 'YYYY-MM-DDTHH:mm:ssZ').format(
    'YYYY-MM-DD HH:mm:ss'
  );
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
  const past = moment(pastDate, 'YYYY-MM-DD HH:mm:ss');
  const now = moment(nowDate, 'YYYY-MM-DD HH:mm:ss');
  if (type === 'years') {
    // console.log('년 차이', Math.floor(moment.duration(now.diff(past)).asYears()));
    return Math.floor(moment.duration(now.diff(past)).asYears());
  }
  if (type === 'months') {
    // console.log('월 차이', Math.floor(moment.duration(now.diff(past)).asMonths()));
    return Math.floor(moment.duration(now.diff(past)).asMonths());
  }
  if (type === 'days') {
    // console.log('일 차이', Math.floor(moment.duration(now.diff(past)).asDays()));
    return Math.floor(moment.duration(now.diff(past)).asDays());
  }
  if (type === 'hours') {
    // console.log('시간 차이', Math.floor(moment.duration(now.diff(past)).asHours()));
    return Math.floor(moment.duration(now.diff(past)).asHours());
  }
  if (type === 'minutes') {
    // console.log('분 차이', Math.floor(moment.duration(now.diff(past)).asMinutes()));
    return Math.floor(moment.duration(now.diff(past)).asMinutes());
  }
  if (type === 'seconds') {
    // console.log('초 차이', Math.floor(moment.duration(now.diff(past)).asSeconds()));
    return Math.floor(moment.duration(now.diff(past)).asSeconds());
  }
};

const renderDate = createdAt => {
  const Year = transformDate('years', createdAt);
  const Month = transformDate('months', createdAt);
  const Day = transformDate('days', createdAt);
  const Time = transformDate('hours', createdAt);
  const Minute = transformDate('minutes', createdAt);
  const Seconds = transformDate('seconds', createdAt);

  if (Year > 0) {
    if (Month > 0 && Month > 12) {
      return Year + ' years, ' + (Month % 12) + ' months ago';
    }
    return Year + ' years ago';
  }
  if (Month > 0 && Month < 12) {
    return Month + ' months ago';
  }
  if (Day > 0 && Day < 30) {
    return Day + ' days ago';
  }
  if (Time > 0 && Time < 24) {
    return Time + ' times ago';
  }
  if (Minute > 0 && Minute < 60) {
    return Minute + ' min ago';
  }
  if (Seconds > 0 && Seconds < 60) {
    return Seconds + ' seconds ago';
  }
};

export default renderDate;
