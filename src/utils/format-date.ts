import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 将从后端获取的时间数据，转化为utc时间输出需要安装的插件(dayjs默认是转化为本地的时间)
dayjs.extend(utc)

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcStr(
  utcString: string,
  format: string = DEFAULT_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
