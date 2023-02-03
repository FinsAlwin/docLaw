import styles from "@/styles/Petition.module.css";
import Docxtemplater from "docxtemplater";
import { base_url } from "@/config";
import { useState } from "react";
import CustomInput from "../Form/input";
import CustomTextArea from "../Form/textArea";
import CustomDatePicker from "../Form/datePicker";
import PetitionPreview from "./petitionPreview";
import { ProgressBar } from "react-loader-spinner";
import CustomButton from "../Button/customButton";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomInputFile from "../Form/inputFile";

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
  const [highCourt, setHighCourt] = useState("");
  const [juridiction, setJuridiction] = useState("");
  const [petitiontype, setPetitiontype] = useState("");

  const [petitionerName, setPetitionerName] = useState("");
  const [petitionerAdress1, setPetitionerAdressLine1] = useState("");
  const [petitionerAdress2, setPetitionerAdressLine2] = useState("");

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

  const [annexuresNo, setAnnexures] = useState(1);

  const [petitionTitle, setPetitionTitle] = useState("");

  const [htmldocPreview, setHtmldocPreview] = useState("");

  const [isloader, setIsloader] = useState(false);

  const [value, setValue] = useState("1");

  const [stateAnnexures, setStateAnnexures] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(`${newValue}`);
  };

  const handleDocProcessing = async (e) => {
    await setIsloader(true);
    e.preventDefault();
    const payload = {
      courtName: highCourt,
      juridiction: juridiction,
      petitionNumber: petitionNumber,
      petitionerName: petitionerName,
      responsentName: respondentName,
      petitiontype: petitiontype,
      petitionerAdress1: petitionerAdress1,
      petitionerAdress2: petitionerAdress2,
      respondentAdress1: respondentAdress1,
      respondentAdress2: respondentAdress2,
      advocateFilledBy: advocateFilledBy,
      advocateAddress1: advocateAddress1,
      advocateAddress2: advocateAddress2,
      place: place,
      date: date,
      petFillingtype: petFillingtype,
      dateOfListing: dateOfListing,
      isUregent: isUregent,
      petitionTitle: petitionTitle,
      isUregent: isUregent,
      annexuresNo: annexuresNo,
      annexuresContent: stateAnnexures,
    };
    const res = await fetch(`/api/docxGen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const dataRes = await res.json();

    if (res.status == 200) {
      await saveAs(dataRes.url);
      await setHtmldocPreview(dataRes.content);

      setIsloader(false);
    }
  };

  const onValueChangetextarea = (e, f) => {
    setStateAnnexures((prevState) => ({
      ...prevState,
      [f]: { text: e },
    }));
  };

  const handleFileUpload = (e, f) => {
    getBase64(e)
      .then((result) => {
        e["base64"] = result;

        setStateAnnexures((prevPerson) => {
          return {
            ...prevPerson,
            [f]: { file: result, text: prevPerson[f].text },
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAnnexures = (annexuresNo) => {
    let content = [];
    for (let step = 1; step <= annexuresNo; step++) {
      content.push(
        <Tab
          key={`${step}tab`}
          value={`${step}`}
          label={`ANNEXURE P-${step}`}
        />
      );
    }

    return content;
  };

  const renderAnnexuresTabPannel = (annexuresNo) => {
    let content = [];
    for (let step = 1; step <= annexuresNo; step++) {
      content.push(
        <TabPanel key={`${step}tabPanel`} value={`${step}`}>
          <CustomTextArea
            label={`Title of Annexure P-${step}`}
            isRequired={true}
            minLength={3}
            maxLength={100}
            rows={3}
            onValueChangetextarea={(e) =>
              onValueChangetextarea(e, `annexuresNo${step}`)
            }
          />

          {stateAnnexures.length !== 0 && (
            <CustomInputFile
              label="Upload attachment"
              handleFileUpload={(e) =>
                handleFileUpload(e, `annexuresNo${step}`)
              }
            />
          )}
        </TabPanel>
      );
    }

    return content;
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };

  return (
    <div className={styles.petitionContainer}>
      {isloader && (
        <div className={styles.loader}>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      )}
      <form
        onSubmit={handleDocProcessing}
        className="container d-flex justify-content-start align-items-center"
      >
        <div className={`p-5 ${styles.formContainer}`}>
          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="Select High Court*"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Name of High Court"
                onValueChange={(e) => setHighCourt(e)}
              />
              <CustomInput
                label="Select Jurisdiction*"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Jurisdiction"
                onValueChange={(e) => setJuridiction(e)}
              />
              <CustomInput
                label="Select Type of Petition*"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Type of Petition"
                onValueChange={(e) => setPetitiontype(e)}
              />

              {/* <button
                type="submit"
                className="btn btn-primary ml-3"
                onClick={handleMainheader}
              >
                Next <span>{">>"}</span>
              </button> */}
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-lg-6">
              <h4 className="p-2">DETAILS OF THE PETITIONER</h4>
              <CustomInput
                label="Name of the Petitioner*"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Name of Petitioner"
                onValueChange={(e) => setPetitionerName(e)}
              />

              <CustomInput
                label="Address of the Petitioner*"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Address Line 1"
                onValueChange={(e) => setPetitionerAdressLine1(e)}
              />

              <CustomInput
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Address Line 2"
                onValueChange={(e) => setPetitionerAdressLine2(e)}
              />

              <h4 className="p-2">DETAILS OF THE RESPONDENT</h4>

              <CustomInput
                label="Name of the Respondent*"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Name of Petitioner"
                onValueChange={(e) => setRespondentName(e)}
              />

              <CustomInput
                label="Address of the Respondent*"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Address Line 1"
                onValueChange={(e) => setRespondentAdress1(e)}
              />

              <CustomInput
                isRequired={true}
                minLength={3}
                maxLength={25}
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
                minLength={3}
                maxLength={25}
                placeholder="Petitioner’s Advocate Name"
                onValueChange={(e) => setAdvocateFilledBy(e)}
              />
              <CustomInput
                label="Address of the Advocate*"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Address Line 1"
                onValueChange={(e) => setAdvocateAddress1(e)}
              />
              <CustomInput
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Address Line 2"
                onValueChange={(e) => setAdvocateAddress2(e)}
              />
              {/* <button
                type="button"
                className="btn btn-warning ml-3"
                onClick={handleDetailesback1}
              >
                Back <span>{"<<"}</span>
              </button>
              &nbsp;
              <button
                type="submit"
                className="btn btn-primary ml-3"
                onClick={handleDetailes1}
              >
                Next <span>{">>"}</span>
              </button> */}
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="Petition Number"
                type="text"
                isRequired={true}
                minLength={3}
                maxLength={25}
                placeholder="Petition Number"
                onValueChange={(e) => setPetitionNumber(e)}
              />
              <div className="row">
                <div className="col-lg-6">
                  <CustomInput
                    label="Place"
                    type="text"
                    isRequired={true}
                    minLength={3}
                    maxLength={25}
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
                minLength={3}
                maxLength={25}
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
                    <input
                      className="form-check-input"
                      type="radio"
                      value={isUregent}
                      checked={isUregent}
                      onChange={() => setIsUregent(true)}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  &nbsp;&nbsp;
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={!isUregent}
                      checked={!isUregent}
                      onChange={() => setIsUregent(false)}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
              <div className="form-group p-2">
                <label className="p-2">No. of Annexures</label>
                <select
                  className="form-control w-25"
                  onChange={(e) => setAnnexures(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              {/* <button
                type="button"
                className="btn btn-warning ml-3"
                onClick={handleDetailesback2}
              >
                Back <span>{"<<"}</span>
              </button>
              &nbsp; */}
            </div>

            <div className="col-lg-6"></div>
          </div>

          <hr />

          {/* <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {renderAnnexures(annexuresNo)}
            </Tabs>
          </Box> */}

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange}>
                  {renderAnnexures(annexuresNo)}
                </TabList>
              </Box>

              {renderAnnexuresTabPannel(annexuresNo)}
            </TabContext>
          </Box>

          <hr />

          <CustomButton name="GENERATE TEMPLATE" type="submit" />
        </div>
      </form>

      {/* &nbsp;
      {htmldocPreview.length !== 0 && (
        <PetitionPreview htmlContent={htmldocPreview} />
      )} */}
    </div>
  );
}
