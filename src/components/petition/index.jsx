import styles from "@/styles/Petition.module.css";
import Docxtemplater from "docxtemplater";
import { base_url } from "@/config";
import { useState } from "react";
import CustomInput from "../Form/input";
import CustomTextArea from "../Form/textArea";
import CustomDatePicker from "../Form/datePicker";
import PetitionPreview from "./petitionPreview";

import useSWR from "swr";

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Petition() {
  const [isHeadingActive, setIsHeadingActive] = useState(true);
  const [isDetailsActive1, setIsDetailsActive1] = useState(false);
  const [isDetailsActive2, setIsDetailsActive2] = useState(false);

  const [highCourt, setHighCourt] = useState("");
  const [juridiction, setJuridiction] = useState("");
  const [petitiontype, setPetitiontype] = useState("");

  const [petitionerName, setPetitionerName] = useState("");
  const [petitionerAdressLine1, setPetitionerAdressLine1] = useState("");
  const [petitionerAdressLine2, setPetitionerAdressLine2] = useState("");

  const [respondentName, setRespondentName] = useState("");
  const [respondentAdress1, setRespondentAdress1] = useState("");
  const [respondentAdress2, setRespondentAdress2] = useState("");

  const [advocateFilledBy, setAdvocateFilledBy] = useState("");
  const [advocateAddress1, setAdvocateAddress1] = useState("");
  const [advocateAddress2, setAdvocateAddress2] = useState("");

  const [petitionNumber, setPetitionNumber] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  const [petFillingtype, setPetFillingtype] = useState("");

  const [dateOfListing, setDateOfListing] = useState("");

  const [isUregent, setIsUregent] = useState(false);

  const [petitionTitle, setPetitionTitle] = useState("");

  const handleDocProcessing = async () => {
    // await genDocx();

    const payload = {
      courtName: highCourt,
      juridiction: juridiction,
      petitionNumber: petitionNumber,
      petitionerName: petitionerName,
      responsentName: respondentName,
    };
    const res = await fetch(`/api/generateDoc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const dataRes = await res.json();

    if (res.status == 200) {
      saveAs(dataRes.url);
    }
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
          PETITIONTYPE: petitiontype.toUpperCase(),
          PETITIONNUMBER: petitionNumber.toUpperCase(),
          PETITIONERNAME: petitionerName.toUpperCase(),
          RESPONDENTNAME: respondentName.toUpperCase(),
          PETTITLE: petitionTitle.toUpperCase(),
          PETPLACE: place.toUpperCase(),
          PETDATE: date,
          DATEOFLISTING: dateOfListing,
          PETITIONERADDRESS1: petitionerAdressLine1.toUpperCase(),
          PETITIONERADDRESS2: petitionerAdressLine2.toUpperCase(),
          RESPONDENTADDRESS1: respondentAdress1.toUpperCase(),
          RESPONDENTADDRESS2: respondentAdress2.toUpperCase(),
          ADOVOCATEFILLEDBY: advocateFilledBy.toUpperCase(),
          ADVOCATEADDRESS1: advocateAddress1.toUpperCase(),
          ADVOCATEADDRESS2: advocateAddress2.toUpperCase(),
          PETFILLINGTYPE: petFillingtype.toUpperCase(),
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

  const handleMainheader = () => {
    setIsHeadingActive(false);
    setIsDetailsActive1(true);
  };

  const handleDetailes1 = () => {
    setIsHeadingActive(false);
    setIsDetailsActive1(false);
    setIsDetailsActive2(true);
  };
  return (
    <>
      <div className={`p-5 ${styles.formContainer}`}>
        {isHeadingActive && (
          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="Select High Court*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Name of High Court"
                onValueChange={(e) => setHighCourt(e)}
              />
              <CustomInput
                label="Select Jurisdiction*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Jurisdiction"
                onValueChange={(e) => setJuridiction(e)}
              />
              <CustomInput
                label="Select Type of Petition*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Type of Petition"
                onValueChange={(e) => setPetitiontype(e)}
              />

              <button
                type="button"
                className="btn btn-primary ml-3"
                onClick={handleMainheader}
              >
                Next <span>{">>"}</span>
              </button>
            </div>
          </div>
        )}

        {isDetailsActive1 && (
          <div className="row">
            <div className="col-lg-6">
              <h4 className="p-2">DETAILS OF THE PETITIONER</h4>
              <CustomInput
                label="Name of the Petitioner*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Name of Petitioner"
                onValueChange={(e) => setPetitionerName(e)}
              />

              <CustomInput
                label="Address of the Petitioner*"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 1"
                onValueChange={(e) => setPetitionerAdressLine1(e)}
              />

              <CustomInput
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 2"
                onValueChange={(e) => setPetitionerAdressLine2(e)}
              />

              <h4 className="p-2">DETAILS OF THE RESPONDENT</h4>

              <CustomInput
                label="Name of the Respondent*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Name of Petitioner"
                onValueChange={(e) => setRespondentName(e)}
              />

              <CustomInput
                label="Address of the Respondent*"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 1"
                onValueChange={(e) => setRespondentAdress1(e)}
              />

              <CustomInput
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 2"
                onValueChange={(e) => setRespondentAdress2(e)}
              />
            </div>

            <div className="col-lg-6">
              <h4 className="p-2">DETAILS OF THE PETITIONER’s ADVOCATE</h4>

              <CustomInput
                label="Filed By*"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Petitioner’s Advocate Name"
                onValueChange={(e) => setAdvocateFilledBy(e)}
              />

              <CustomInput
                label="Address of the Advocate*"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 1"
                onValueChange={(e) => setAdvocateAddress1(e)}
              />

              <CustomInput
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Address Line 2"
                onValueChange={(e) => setAdvocateAddress2(e)}
              />

              <button
                type="button"
                className="btn btn-primary ml-3"
                onClick={handleDetailes1}
              >
                Next <span>{">>"}</span>
              </button>
            </div>
          </div>
        )}

        {isDetailsActive2 && (
          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="Petition Number"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="50"
                placeholder="Petition Number"
                onValueChange={(e) => setPetitionNumber(e)}
              />
              <div className="row">
                <div className="col-lg-6">
                  <CustomInput
                    label="Place"
                    type="text"
                    isRequired={true}
                    minLength="3"
                    maxLength="20"
                    placeholder="Place"
                    onValueChange={(e) => setPlace(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <CustomDatePicker
                    label="Date"
                    placeholder={"DD/MM/YYYY"}
                    onValueChange={(e) => setDate(e)}
                  />
                </div>
              </div>

              <CustomInput
                label="Filing Type"
                type="text"
                isRequired={true}
                minLength="3"
                maxLength="20"
                placeholder="Filing Type"
                onValueChange={(e) => setPetFillingtype(e)}
              />

              <CustomDatePicker
                label="Date for Listing"
                placeholder={"DD/MM/YYYY"}
                onValueChange={(e) => setDateOfListing(e)}
              />

              <div className="form-group p-2">
                <label className="p-2">Urgent Application?</label>
                <div className="d-flex">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" />
                    <label className="form-check-label">Yes</label>
                  </div>
                  &nbsp;&nbsp;
                  <div className="form-check">
                    <input className="form-check-input" type="radio" />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>

              <div className="form-group p-2">
                <label className="p-2">No. of Annexures</label>
                <select className="form-control w-25">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={handleDocProcessing}
              >
                GENERATE TEMPLATE
              </button>
            </div>

            <div className="col-lg-6">
              {/* <PetitionPreview url={"http://localhost:3000/files/alwin.docx"} /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
