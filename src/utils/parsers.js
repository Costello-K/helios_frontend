import i18n from '../i18n';
const { t } = i18n.global;

export const daytimeParser = daytime => {
  const [days, time] = daytime.includes(' ')
    ? daytime.split(' ')
    : [0, daytime]

  const [hours, minutes, secondsWithMilliseconds] = time.split(':');
  const seconds = secondsWithMilliseconds.split('.')[0];

  return `
    ${days} ${t('texts.day')} 
    ${hours} ${t('texts.hour')} 
    ${minutes} ${t('texts.minute')} 
    ${seconds} ${t('texts.second')}
  `
};
