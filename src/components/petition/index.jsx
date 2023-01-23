import styles from "@/styles/Petition.module.css";
import PetitionPreview from "./petitionPreview";
import BtnDownload from "../Button/BtnDownload";

export default function Petition() {
  return (
    <>
      <div className={styles.petitionMain}>
        <PetitionPreview />
        <div className={styles.BtnDownload}>
          <BtnDownload />
        </div>
      </div>
    </>
  );
}
