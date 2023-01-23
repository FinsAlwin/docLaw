import styles from "@/styles/Petition.module.css";
import PetitionPreview from "./petitionPreview";
import BtnDownload from "../Button/BtnDownload";
import Docxtemplater from "docxtemplater";
import { base_url } from "@/config";
import { useState } from "react";
import WebViewerContext from "../../context/webviewer";

import PizZip from "pizzip";
import { saveAs } from "file-saver";

let PizZipUtils = null;

if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default function Petition() {
  const [petitionerName, setPetitionerName] = useState("");
  const [preview, setPreview] = useState(false);
  const [document, setDocument] = useState();
  const [instance, setInstance] = useState();

  const handleDocProcessing = async () => {
    await genDocx();
    setPreview(true);
  };

  const genDocx = async () => {
    loadFile(
      `${base_url}template/template1.docx`,
      async function (error, content) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);
        doc.setData({
          PETITIONERNAME: petitionerName.toUpperCase(),
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function (error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }

        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // Output the document using Data-URI
        saveAs(out, "output.docx");
      }
    );
  };

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className={`${preview ? "col-lg-6" : "col-lg-12"}`}>
            <div
              className={`card shadow d-flex flex-column justify-content-center align-items-center ${styles.cardTransition}`}
            >
              <div className={styles.formContainer}>
                <label className="p-2">PETITIONERNAME:</label>
                <input
                  type="text"
                  required
                  minLength="3"
                  maxLength="20"
                  className="p-2"
                  value={petitionerName}
                  placeholder="John Doe"
                  onChange={(e) => setPetitionerName(e.target.value)}
                />
              </div>

              <div className={styles.btnContainer}>
                <BtnDownload
                  title={"Generate Document Preview"}
                  click={handleDocProcessing}
                />
              </div>
            </div>
          </div>
          {preview && (
            <>
              <div className="col-lg-6">
                {/* <PetitionPreview document={document} /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
