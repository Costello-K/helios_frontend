import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/uk';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      formatTime(dateTime) {
        return dayjs.utc(dateTime).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
      },
    };
  },
};
