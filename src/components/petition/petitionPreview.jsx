import styles from "@/styles/Petition.module.css";

export default function PetitionPreview(props) {
  return (
    <>
      <div
        size="A4"
        className={`${styles.petitionPreview} container`}
        dangerouslySetInnerHTML={{ __html: props.htmlContent }}
      />
    </>
  );
}
