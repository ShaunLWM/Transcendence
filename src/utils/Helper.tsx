import dayjs from "dayjs";
import RelativeTimePlugin from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTimePlugin);

export const fromNow = (time: string | number) => {
	return dayjs(time).fromNow();
};
