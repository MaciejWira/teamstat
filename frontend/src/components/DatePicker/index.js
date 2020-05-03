import React from 'react';

import { dateInput } from '../../helpers/dateParsers';


const DatePicker = ({ value, onChangeHandler }) => (
  <div className="c-datepicker">
    <label className="a-label c-datepicker__label">Data meczu</label>
    <input
      onChange={e => onChangeHandler(e.target.value)}
      value={value}
      max={dateInput(new Date())}
      type="date" />
  </div>
)

export default DatePicker;
