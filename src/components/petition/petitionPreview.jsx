import styles from "@/styles/Petition.module.css";

export default function PetitionPreview(props) {
  return (
    <>
      <div
        className={styles.webviewer}
        ref={viewer}
        style={{ height: "100vh" }}
      ></div>
    </>
  );
}
