// Native Date helpers — no moment dependency

const addDays = (date, days) => new Date(date.getTime() + days * 86400000);

const toISO = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const isLessThanOrEqual = (dateA, dateB) => toISO(dateA) <= toISO(dateB);

// @params _date_start: String (YYYY-MM-DD)
// @params estimated_time: Number
// @params first_add_number: Number
// @params second_add_number: Number
// @return string[] — ISO date strings
export const calculateDates = (_date_start, estimated_time, first_add_number, second_add_number) => {
  // Mirror original moment logic: start = date_start - 1 day
  const date_start = addDays(new Date(_date_start), -1);
  const date_last_day = addDays(date_start, Number(estimated_time));

  let date_last_form = addDays(date_start, first_add_number);
  const list_form = [date_last_form];

  while (isLessThanOrEqual(date_last_form, date_last_day)) {
    date_last_form = addDays(date_last_form, second_add_number);
    if (isLessThanOrEqual(date_last_form, date_last_day)) {
      list_form.push(date_last_form);
    }
  }

  return list_form.map(toISO);
};

export const veryShort = (_date_start, estimated_time) => [];

export const short = (date_start, estimated_time) =>
  calculateDates(date_start, estimated_time, 7, 14);

export const medium = (date_start, estimated_time) =>
  calculateDates(date_start, estimated_time, 7, 28);

export const large = (date_start, estimated_time) =>
  calculateDates(date_start, estimated_time, 14, 35);

// @return string[] — ISO date strings
export const calculateDatesList = (date_start, estimated_time) => {
  const n = Number(estimated_time);
  if (n < 5) {
    return veryShort(date_start, n);
  } else if (n >= 5 && n <= 30) {
    return short(date_start, n);
  } else if (n > 30 && n <= 60) {
    return medium(date_start, n);
  } else if (n > 60) {
    return large(date_start, n);
  }
  return [];
};

// @return string | null — ISO date string or null
export const getLastControlDay = (_date_start, estimated_time) => {
  const n = Number(estimated_time);
  if (n >= 315) {
    return toISO(addDays(new Date(_date_start), n));
  }
  return null;
};
