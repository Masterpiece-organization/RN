// src/utils/dateUtils.js
import moment from 'moment';

export const formatTime = time => {
  const now = moment();
  const inputTime = moment(time);
  const diff = now.diff(inputTime, 'seconds');

  if (diff < 60) {
    // 1분 미만
    return '방금 전';
  } else if (diff < 3600) {
    // 1시간 미만
    return `${Math.floor(diff / 60)}분 전`;
  } else if (diff < 86400) {
    // 24시간 미만
    return `${Math.floor(diff / 3600)}시간 전`;
  } else if (diff < 604800) {
    // 7일 미만
    return `${Math.floor(diff / 86400)}일 전`;
  } else {
    return inputTime.format('YYYY년 M월 D일');
  }
};
