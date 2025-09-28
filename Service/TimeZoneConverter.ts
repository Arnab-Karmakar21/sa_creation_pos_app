import moment from 'moment';
export const ConvertTimeZone = (
  date: any,
  format: any = 'DD-MM-YYYY hh:mm:ss A',
) => {
  return moment.utc(date).utcOffset(moment().format('Z')).format(format);
};
