import styles from "@/styles/Form.module.css";
export default function CustomInput(props) {
  const handleChange = (e) => {
    props.onValueChange(e);
  };
  return (
    <>
      <div className="form-group p-2">
        {props.label && <label className="p-2">{props.label}</label>}

        <input
          type={props.type}
          required={props.isRequired}
          minLength={props.minLength}
          maxLength={props.maxLength}
          className={`form-control ${styles.customInput}`}
          placeholder={props.placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
}
