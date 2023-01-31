import styles from "@/styles/Form.module.css";

export default function CustomTextArea(props) {
  const handleChange = (e) => {
    props.onValueChangetextarea(e.target.value);
  };
  return (
    <div className="form-group p-2">
      {props.label && <label className="p-2">{props.label}</label>}
      <textarea
        required={props.isRequired}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        className={`form-control ${styles.customInput}`}
        rows={props.rows}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
}
