import { parse, isDate, isValid, isFuture, differenceInYears } from 'date-fns';

export function dateValidate(dateString: string): boolean {
  return isDate(dateString)
    && isValid(parse(dateString))
    && !isFuture(dateString)
    && differenceInYears(Date.now(), dateString) < 150;
}
