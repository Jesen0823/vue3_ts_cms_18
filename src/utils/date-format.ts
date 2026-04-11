import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcTime(utcString: string, format?: string) {
  return dayjs.utc(utcString).format(format ?? DATE_FORMAT)
}
