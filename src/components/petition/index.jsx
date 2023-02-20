import styles from "@/styles/Petition.module.css";
import { base_url } from "@/config";
import { useState } from "react";
import CustomInput from "../Form/input";
import CustomTextArea from "../Form/textArea";
import CustomDatePicker from "../Form/datePicker";
import CustomButton from "../Button/customButton";
import CustomSelect from "../Form/select";
import PetitionPreview from "./petitionPreview";
import { ThreeDots } from "react-loader-spinner";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomInputFile from "../Form/inputFile";
import DownloadFile from "../Button/downloadBtn";

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

  const [isloader, setIsloader] = useState(false);

  const [value, setValue] = useState("1");
  const [stateAnnexures, setStateAnnexures] = useState({});

  const [downloadUrl, setDownloadUrl] = useState("");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDocProcessing = async (e) => {
    await setIsloader(true);
    e.preventDefault();

    const indexList = [
      "Urgent Application",
      "Notice of Motion",
      "Memo of Parties",
      "Synopsis & List of Dates",
      "Some Title",
    ];

    const annexureList = [];

    for (let i = 1; i <= value; i++) {
      annexureList.push(`ANNEXURE P-${i}`);
    }

    // const updatedIndexList = indexList.concat(annexureList, "Vakalatnama");

    const updatedIndexList = indexList.concat(annexureList);

    const payload = {
      isUrgent: isUregent,
      placeHolder: {
        "{HIGHCOURT}": highCourt,
        "{JURIDICTION}": juridiction,
        "{PETITIONNUMBER}": petitionNumber,
        "{PETITIONERNAME}": petitionerName,
        "{PETITIONERADDRESS1}": petitionerAdress1,
        "{PETITIONERADDRESS2}": petitionerAdress2,
        "{RESPONDENTNAME}": respondentName,
        "{RESPONDENTADDRESS1}": respondentAdress1,
        "{RESPONDENTADDRESS2}": respondentAdress2,
        "{ADOVOCATEFILLEDBY}": advocateFilledBy,
        "{ADVOCATEADDRESS1}": advocateAddress1,
        "{ADVOCATEADDRESS2}": advocateAddress2,
        "{PETPLACE}": place,
        "{PETDATE}": date,
        "{PETFILLINGTYPE}": petFillingtype,
        "{DATEOFLISTING}": dateOfListing,
        "{PETTITLE}": "Some Title",
      },
      annexureListings: stateAnnexures,
      indexList: updatedIndexList,
    };

    const res = await fetch(
      `http://Docslaw-env-1.eba-qcrnhgd7.ap-south-1.elasticbeanstalk.com/api/v1/genDocx`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(payload),
      }
    );

    const dataRes = await res.json();

    if (res.status == 200) {
      await setDownloadUrl(dataRes.download_url);
      await setIsloader(false);
    }
  };

  const onValueChangeTextArea = (e, f) => {
    setStateAnnexures((prevState) => ({
      ...prevState,
      [f]: { text: e },
    }));
  };

  const handleFileUpload = (e, f) => {
    getBase64(e)
      .then((result) => {
        setStateAnnexures((prevState) => ({
          ...prevState,
          [f]: { file: result, text: prevState[f]?.text },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAnnexures = () => {
    let content = [];
    for (let step = 1; step <= annexuresNo; step++) {
      content.push(
        <Tab
          key={`tab-${step}`}
          value={`${step}`}
          label={`ANNEXURE P-${step}`}
        />
      );
    }
    return content;
  };

  const renderAnnexuresTabPanel = () => {
    let content = [];
    for (let step = 1; step <= annexuresNo; step++) {
      const annexureKey = `annexure-${step}`;
      content.push(
        <TabPanel key={`tab-panel-${step}`} value={`${step}`}>
          <CustomTextArea
            label={`Title of Annexure P-${step}`}
            isRequired={true}
            minLength={3}
            maxLength={100}
            rows={3}
            value={stateAnnexures[annexureKey]?.text}
            onValueChange={(e) => onValueChangeTextArea(e, annexureKey)}
          />

          <CustomInputFile
            label="Upload attachment"
            handleFileUpload={(e) => handleFileUpload(e, annexureKey)}
          />
        </TabPanel>
      );
    }
    return content;
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const HighCourtList = [
    {
      "Allahabad High Court": ["Allahabad (Prayagraj)"],
      "Bombay High Court": ["Mumbai", "Nagpur", "Aurangabad", "Goa"],
      "Calcutta High Court": ["Kolkata (Calcutta)"],
      "Delhi High Court": ["Delhi"],
      "Gujarat High Court": ["Ahmedabad"],
    },
  ];

  const optionsHighCourt = Object.keys(HighCourtList[0]).map((hc) => ({
    label: hc,
    value: hc,
    cities: HighCourtList[0][hc],
  }));

  const optionsJurisdiction = highCourt
    ? optionsHighCourt
        .find((hc) => hc.value === highCourt)
        .cities.map((city) => ({
          label: city,
          value: city,
        }))
    : [];

  const optionsPetition = [
    { label: "Petition Template X", value: "Petition_template_X" },
  ];

  const handleOptionChangeHighcourt = (e) => {
    setHighCourt(e);
  };

  const handleOptionChangeJurisdiction = (e) => {
    setJuridiction(e);
  };

  const handleOptionChangePetition = (e) => {
    setPetitiontype(e);
  };

  return (
    <div className={styles.petitionContainer}>
      {isloader && (
        <div className={styles.loader}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      <form
        onSubmit={handleDocProcessing}
        className="container d-flex justify-content-start align-items-center"
      >
        <div className={`p-5 ${styles.formContainer}`}>
          <div className="row">
            <div className="col-12">
              <CustomSelect
                options={optionsHighCourt}
                onChange={handleOptionChangeHighcourt}
                label="Select High Court*"
              />
              <CustomSelect
                options={optionsJurisdiction}
                onChange={handleOptionChangeJurisdiction}
                label="Select Jurisdiction*"
              />
              <CustomSelect
                options={optionsPetition}
                onChange={handleOptionChangePetition}
                label="Select Type of Petition*"
              />
            </div>
          </div>

          {highCourt && juridiction && petitiontype && (
            <>
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

              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleTabChange}>
                      {renderAnnexures()}
                    </TabList>
                  </Box>
                  {renderAnnexuresTabPanel()}
                </TabContext>
              </Box>

              <hr />

              {downloadUrl.length == 0 && (
                <CustomButton name="GENERATE TEMPLATE" type="submit" />
              )}

              {downloadUrl.length !== 0 && (
                <DownloadFile fileUrl={downloadUrl} />
              )}
            </>
          )}
        </div>
      </form>

      {/* &nbsp;
      {htmldocPreview.length !== 0 && (
        <PetitionPreview htmlContent={htmldocPreview} />
      )} */}
    </div>
  );
}
