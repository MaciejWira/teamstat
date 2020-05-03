// eg. 25 kwiecień 2012

export const dateStandard = date => {

  const months = [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień'
  ];

  const parser = dateDate =>  `${dateDate.getDate()} ${months[dateDate.getMonth()]} ${dateDate.getFullYear()}`;

  if (typeof date === 'string'){
    const _date = new Date(date);
    return parser(_date);
  } else if (typeof date.getDay === 'function'){
    return parser(date);
  } else return date;

}

// eg. 2020-12-12

export const dateInput = day => {
  const _day = day ? day : new Date();
  const month = _day.getMonth() + 1;
  return `${_day.getFullYear()}-${month < 10 ? "0" + month : month}-${_day.getDate() < 10 ? "0" + _day.getDate() : _day.getDate()}`
}

// reset time

export const dateResetHour = date => {
  if (typeof date.getDay === 'function'){
    const _date = date;
    _date.setHours(12);
    _date.setMinutes(0);
    _date.setSeconds(0);
    _date.setMilliseconds(0);
    return _date;
  } else return date;
}

// const compareDays = (dateOne, dateTwo) => {
//   if (typeof dateOne.getDate === 'function' && typeof dateTwo.getDate === 'function'){
//
//
//
//   } else return false;
// }
