import styles from "@/styles/Petition.module.css";
import Docxtemplater from "docxtemplater";
import { base_url } from "@/config";
import { useState } from "react";
import CustomInput from "../Form/input";
import CustomTextArea from "../Form/textarea";
import CustomDatePicker from "../Form/datePicker";

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
  const [highCourt, setHighCourt] = useState("");
  const [juridiction, setJuridiction] = useState("");
  const [petitionNumber, setPetitionNumber] = useState("");
  const [petitionerName, setPetitionerName] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [petitionTitle, setPetitionTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [advocateFilledBy, setAdvocateFilledBy] = useState("");
  const [advocateAddress, setAdvocateAddress] = useState("");
  const [petFillingtype, setPetFillingtype] = useState("");
  const [dateOfListing, setDateOfListing] = useState("");
  const [respondentAdress, setRespondentAdress] = useState("");
  const [petitionerAdress, setPetitionerAdress] = useState("");

  const handleDocProcessing = async () => {
    await genDocx();
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
          HIGHCOURT: highCourt.toUpperCase(),
          JURIDICTION: juridiction.toUpperCase(),
          PETITIONNUMBER: petitionNumber.toUpperCase(),
          PETITIONERNAME: petitionerName.toUpperCase(),
          RESPONDENTNAME: respondentName.toUpperCase(),
          PETTITLE: petitionTitle.toUpperCase(),
          PETPLACE: place.toUpperCase(),
          PETDATE: date,
          ADOVOCATEFILLEDBY: advocateFilledBy.toUpperCase(),
          ADVOCATEADDRESS: advocateAddress.toUpperCase(),
          PETFILLINGTYPE: petFillingtype.toUpperCase(),
          DATEOFLISTING: dateOfListing,
          RESPONDENTADDRESS: respondentAdress.toUpperCase(),
          PETITIONERADDRESS: petitionerAdress.toUpperCase(),
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
        saveAs(out, `${petitionNumber}.docx`);
      }
    );
  };

  return (
    <>
      <div className="container p-5">
        <form>
          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="HIGHCOURT:"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="IN THE HIGH COURT OF DELHI AT NEW DELHI"
                onValueChange={(e) => setHighCourt(e)}
              />

              <CustomInput
                label="JURIDICTION:"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="ORDINARY ORIGINAL JURISDICTION"
                onValueChange={(e) => setJuridiction(e)}
              />

              <CustomInput
                label="PETITIONNUMBER:"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="W.P.(C) NO. ______ OF"
                onValueChange={(e) => setPetitionNumber(e)}
              />

              <CustomInput
                label="PETITIONER NAME:"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="John Doe"
                onValueChange={(e) => setPetitionerName(e)}
              />

              <CustomInput
                label="RESPONDENT NAME"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Jane Doe"
                onValueChange={(e) => setRespondentName(e)}
              />

              <CustomTextArea
                label="PETITION TITLE"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA"
                onValueChange={(e) => setPetitionTitle(e)}
              />

              <CustomInput
                label="PLACE"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="NEW DELHI"
                onValueChange={(e) => setPlace(e)}
              />

              <CustomDatePicker
                label="Date"
                onValueChange={(e) => setDate(e)}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="ADOVOCATE FILLED BY"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="123 ADVOCATES"
                onValueChange={(e) => setAdvocateFilledBy(e)}
              />
              <CustomTextArea
                label="ADVOCATE ADDRESS"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="NEW DELHI 1234567"
                onValueChange={(e) => setAdvocateAddress(e)}
              />
              <CustomInput
                label="CASE TYPE"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="123 ADVOCATES"
                onValueChange={(e) => setPetFillingtype(e)}
              />
              <CustomDatePicker
                label="Date of Lsiting"
                onValueChange={(e) => setDateOfListing(e)}
              />
              <CustomTextArea
                label="RESPONDENT ADDRESS"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="NEW DELHI 1234567"
                onValueChange={(e) => setRespondentAdress(e)}
              />

              <CustomTextArea
                label="PETITIONER ADDRESS"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="NEW DELHI 1234567"
                onValueChange={(e) => setPetitionerAdress(e)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDocProcessing}
            >
              Generate Template
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
