import { DateTime } from "luxon";
import { formatToTimeZone } from "date-fns-timezone";

export const DateUtil = {
  format(date: Date, formatString = "yyyyMMddHHmmss"): string {
    return DateTime.fromJSDate(date).toFormat(formatString);
  },
  /**
   * @returns e.g.) 2021-07-26T16:43:22.765+0900
   */
  getISOStringTZ(): string {
    return formatToTimeZone(new Date(), "YYYY-MM-DDTHH:mm:ss.SSSZZ", {
      timeZone: "Asia/Tokyo",
    });
  },
};
