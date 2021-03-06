import moment from "moment"
// @params date_start: String
// @params estimated_time: Number
// @params first_add_number: Number
// @params second_add_number: Number
// @return [Moment]
const isLessThan = (date_last_form, date_last_day) => date_last_form.format("YYYY-MM-DD") <= date_last_day.format("YYYY-MM-DD")

export const calculateDates = (_date_start, estimated_time, first_add_number, second_add_number) => {
  // current date +1 in the time
  const date_start = moment(_date_start).clone().subtract(1, 'days')
  const date_last_day = date_start.clone().add(estimated_time, 'days')
  var date_last_form = date_start.clone().add(first_add_number, 'days').clone()
  var list_form = [date_last_form]
  while (isLessThan(date_last_form, date_last_day)) {
    date_last_form = date_last_form.clone().add(second_add_number, 'days').clone()
    if (isLessThan(date_last_form, date_last_day)){
      list_form.push(date_last_form)
    }
  }
  return list_form
}

export const veryShort = (date_start, estimated_time) => (
  []
)

export const short = (date_start, estimated_time) => (
  calculateDates(date_start, estimated_time, 7, 14)
)

export const medium = (date_start, estimated_time) => (
  calculateDates(date_start, estimated_time, 7, 28)
)

export const large = (date_start, estimated_time) => (
  calculateDates(date_start, estimated_time, 14, 35)
)

export const calculateDatesList = (date_start, estimated_time) => {
  if ( estimated_time < 5){
    return veryShort(date_start, estimated_time)
  } else if (estimated_time >= 5 && estimated_time <= 30) {
    return short(date_start, estimated_time)
  } else if (estimated_time > 30 && estimated_time <= 60) {
    return medium(date_start, estimated_time)
  } else if (estimated_time > 60) {
    return large(date_start, estimated_time)
  }
}

export const getLastControlDay = (_date_start, estimated_time) => {
  const date_start = moment(_date_start)
  if (estimated_time >= 315) {
    return date_start.clone().add(estimated_time, 'days')
  } else {
    return null
  }
}
