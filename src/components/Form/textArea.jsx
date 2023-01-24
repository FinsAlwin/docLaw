import styles from "@/styles/Form.module.css";

export default function CustomTextArea(props) {
  const handleChange = (e) => {
    props.onValueChange(e.target.value);
  };
  return (
    <div className="form-group p-2">
      <label>{props.label}</label>
      <textarea
        required={props.isRequired}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        className={`form-control ${styles.customInput}`}
        rows="2"
        // defaultValue={props.placeholder}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
}
