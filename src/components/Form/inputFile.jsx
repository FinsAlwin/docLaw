import styles from "@/styles/Form.module.css";

export default function InputFile(props) {
  const handleChange = (e) => {
    props.handleFileUpload(e.target.files[0]);
  };

  return (
    <>
      <div className="form-group p-2">
        {props.label && (
          <label
            className={`${styles.inputBtn} p-2 shadow`}
            htmlFor="actual-btn"
          >
            {props.label}
          </label>
        )}
        <input
          id="actual-btn"
          type="file"
          accept="image/.png,.jpeg"
          hidden
          className={`form-control-file`}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

//  accept = "image/*,.doc, .docx,.pdf";
