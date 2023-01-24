import styles from "@/styles/Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { useState } from "react";

export default function CustomDatePicker(props) {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e) => {
    props.onValueChange(moment(e).format("DD.MM.YYYY"));
  };
  return (
    <>
      <div className="form-group p-2">
        <label className="p-2">{props.label}</label>
        <DatePicker
          className={`form-control ${styles.datePicker}`}
          selected={startDate}
          onChange={(date) => handleChange(date)}
          placeholderText={props.placeholder}
        />
      </div>
    </>
  );
}
