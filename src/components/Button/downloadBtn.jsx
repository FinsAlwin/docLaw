import styles from "@/styles/Button.module.css";

const DownloadFile = (props) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = props.fileUrl;
    link.setAttribute("download", "file");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className={`${styles.CustomButton} shadow`}
      >
        Download
      </button>
    </div>
  );
};

export default DownloadFile;
