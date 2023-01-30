import path from "path";
import fs from "fs";
import HTMLtoDOCX from "html-to-docx";
import getConfig from "next/config";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwlHKQd8tEAmFhBt-ZDe0d4pNWl7HzzNU",
  authDomain: "docslaw-9e938.firebaseapp.com",
  projectId: "docslaw-9e938",
  storageBucket: "docslaw-9e938.appspot.com",
  messagingSenderId: "816546388021",
  appId: "1:816546388021:web:527704a5e53bdc5bd3797c",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { serverRuntimeConfig } = getConfig();

    const dirRelativeToPublicFolder = "files";

    const dir1 = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./public",
      dirRelativeToPublicFolder
    );

    const dir = path.join("./public/files");
    const dirTemp = path.join("./public/template");
    const template = fs.readFileSync(`${dirTemp}/template1.docx`);

    const fileName = `alwin.docx`;

    const documentPath = `${dir}/${fileName}`;

    const content = `<html lang="uk">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <body>
          <p style="text-align:center; font-size: 17px;"><strong>HIGHCOURT</strong><br /></p>
          <p style="text-align:center; font-size: 17px;"><strong>JURIDICTION</strong><br /></p>
          <p style="text-align:center; font-size: 17px;"><strong>PETITIONNUMBER</strong><br /></p>
          <p style="font-size: 17px; font-weight:'bold';"><strong><u>IN THE MATTER OF:</u><br /></p>
          <br />
          <table style="text-align:center; width:100%;" cellspacing="0" cellpadding="0">
            <tr>
              <td style="border: none;" width:"80%">
                <p style=" font-size: 17px;">PETITIONERNAME<br /></p>
              </td>
              <td style="border: none" width:"20%">
                <p style=" font-size: 17px;">…PETITIONER<br /></p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center; border: none;" colspan="2">
                <p style=" font-size: 17px;">VERSUS<br /></p>
              </td>
            </tr>
            <tr>
              <td style="border: none" width:"80%">
                <p style=" font-size: 17px;">RESPONDENTNAME<br /></p>
              </td>
              <td style="border: none" width:"20%">
                <p style=" font-size: 17px;">…RESPONDENT<br /></p>
              </td>
            </tr>
          </table>

          <p style="text-align:center; font-size: 17px; font-weight:'bold';"><strong><u>INDEX</u><br /></p>    

          <br/>

          <table style="text-align:center; width:100%;" cellspacing="0" cellpadding="0">
            <tr>
              <th width="20%">
                <p style="text-align:center; font-size: 17px;"><strong>S. No.</strong><br /></p>
              </th>
              <th width="50%">
                <p style="text-align:center; font-size: 17px;"><strong>Particular</strong><br /></p>
              </th>
              <th width="30%">
                <p style="text-align:center; font-size: 17px;"><strong>Page no.</strong><br /></p>
              </th>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style=" font-size: 17px; display: list-item; list-style-position: inside;text-align:center;"></p>
              </td>
              <td>
                <p style=" font-size: 17px;">Urgent Application <br /></p>
              </td>
              <td style="text-align:center;">
                <p style=" font-size: 17px;"> <br /></p>
              </td>
            </tr>
          </table>

          <br/>

          <p style="text-align:right; font-size: 17px;"><strong>FILED BY</strong><br /></p>
          <p style="text-align:right; font-size: 17px;"><strong>ADOVOCATEFILLEDBY</strong><br /></p>
          <p style="text-align:right; font-size: 17px;"><strong>ADVOCATEADDRESS1</strong><br /></p>
          <p style="text-align:right; font-size: 17px;"><strong>ADVOCATEADDRESS2</strong><br /></p>

          <br/>

          <p style="font-size: 17px;"><strong>PETPLACE</strong><br /></p>

          <p style="font-size: 17px;"><strong>PETDATE</strong><br /></p>

      </body>
      </html>`;

    const data = await HTMLtoDOCX(content);

    // fs.writeFileSync(documentPath, data, (err) => {
    //   if (err) {
    //     reject(err);
    //     return;
    //   }
    //   resolve();
    // });

    const storageRef = ref(storage, `docx/${fileName}`);

    uploadBytes(storageRef, data).then((snapshot) => {
      getDownloadURL(ref(storage, `docx/${fileName}`)).then((url) => {
        res.status(200).json({ content: content, url: url });
      });
    });
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}
