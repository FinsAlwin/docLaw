import styles from "@/styles/Petition.module.css";

import { useEffect, useRef } from "react";

export default function PetitionPreview(props) {
  const viewer = useRef(null);

  useEffect(() => {
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: props.url,
        },
        viewer.current
      ).then((instance) => {
        const { docViewer } = instance;
      });
    });
  }, []);

  return (
    <>
      <div
        className={styles.petitionPreview}
        ref={viewer}
        style={{ height: "100vh" }}
      ></div>
    </>
  );
}
