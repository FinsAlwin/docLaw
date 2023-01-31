import styles from "@/styles/Button.module.css";

export default function CustomButton(props) {
  return (
    <button type={props.type} className={`${styles.CustomButton} shadow`}>
      {props.name}
    </button>
  );
}
