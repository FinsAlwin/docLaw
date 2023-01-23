import styles from "@/styles/Button.module.css";

export default function BtnDownload(props) {
  const handleClick = () => {
    props.click();
  };

  return (
    <button className={styles.btnDownloadPDF} onClick={handleClick}>
      {props.title}
    </button>
  );
}
