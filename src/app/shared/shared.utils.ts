import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export const timeFromNow = (time: Date) => {
    dayjs.extend(relativeTime);
    return dayjs(time).fromNow();
}