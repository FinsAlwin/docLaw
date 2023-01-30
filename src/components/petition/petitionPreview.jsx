import styles from "@/styles/Petition.module.css";

import { useEffect, useRef } from "react";

import ReactHtmlParser from "react-html-parser";

export default function PetitionPreview(props) {
  const viewer = useRef(null);

  // useEffect(() => {
  //   import("@pdftron/webviewer").then(() => {
  //     WebViewer(
  //       {
  //         path: "/webviewer/lib",
  //         initialDoc: props.url,
  //       },
  //       viewer.current
  //     ).then((instance) => {
  //       const { docViewer } = instance;
  //     });
  //   });
  // }, []);

  return (
    <>
      {/* <div
        className={styles.petitionPreview}
        ref={viewer}
        style={{ height: "100vh" }}
      >
        {ReactHtmlParser(props.htmlContent)}
      </div> */}

      <div
        size="A4"
        className={`${styles.petitionPreview} container`}
        dangerouslySetInnerHTML={{ __html: props.htmlContent }}
      />
    </>
  );
}
