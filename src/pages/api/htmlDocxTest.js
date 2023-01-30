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
    // const { serverRuntimeConfig } = getConfig();

    // const dirRelativeToPublicFolder = "files";

    // const dir1 = path.join(
    //   serverRuntimeConfig.PROJECT_ROOT,
    //   "./public",
    //   dirRelativeToPublicFolder
    // );

    // const dir = path.join("./public/files");
    // const dirTemp = path.join("./public/template");
    // const template = fs.readFileSync(`${dirTemp}/template1.docx`);

    const fileName = `alwin.docx`;

    // const documentPath = `${dir}/${fileName}`;

    let annexuresNoList = [];

    const listAnnexures = (annexuresNo) => {
      for (let step = 1; step <= annexuresNo; step++) {
        annexuresNoList.push(`<tr>
            <td style="text-align:center;">
              <p display: list-item; list-style-position: inside;text-align:center;"></p>
            </td>
            <td>
              <p>ANNEXURE P-${step}</p>
            </td>
            <td style="text-align:center;">
              <p> </p>
            </td>
          </tr>`);
      }
    };

    listAnnexures(req.body.annexuresNo);

    const content = `<html lang="uk">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <body>
          <p style="text-align:center;" ><strong>${req.body.courtName.toUpperCase()}</strong></p>
          <p style="text-align:center;" ><strong>${req.body.juridiction.toUpperCase()}</strong></p>
          <p style="text-align:center;" ><strong>${req.body.petitionNumber.toUpperCase()}</strong></p>
          <p style="font-weight:'bold';"><strong><u>IN THE MATTER OF:</u></p>
          
          <table style="text-align:center; width:100%;" align="center" class="Table" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="border: none;" width:"80%">
                <p>${req.body.petitionerName.toUpperCase()}</p>
              </td>
              <td style="border: none" width:"20%">
                <p>…PETITIONER</p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center; border: none;" colspan="2">
                <p>VERSUS</p>
              </td>
            </tr>
            <tr>
              <td style="border: none" width:"80%">
                <p>${req.body.responsentName.toUpperCase()}</p>
              </td>
              <td style="border: none" width:"20%">
                <p>…RESPONDENT</p>
              </td>
            </tr>
          </table>

          <p style="text-align:center; font-weight:'bold';"><strong><u>INDEX</u></p>    
          <table style="width:100%;" align="center" class="Table">
            <tr>
              <th width="20%">
                <p style="text-align:center;"><strong>S. No.</strong></p>
              </th>
              <th width="50%">
                <p style="text-align:center;"><strong>Particular</strong></p>
              </th>
              <th width="30%">
                <p style="text-align:center;"><strong>Page no.</strong></p>
              </th>
            </tr>
            ${
              req.body.isUregent &&
              ` <tr>
              <td style="text-align:center;">
                <p display: list-item; list-style-position: inside;text-align:center;"></p>
              </td>
              <td>
                <p>Urgent Application </p>
              </td>
              <td style="text-align:center;">
                <p> </p>
              </td>
            </tr>`
            }
            <tr>
              <td style="text-align:center;">
                <p display: list-item; list-style-position: inside;text-align:center;"></p>
              </td>
              <td>
                <p>Notice of Motion</p>
              </td>
              <td style="text-align:center;">
                <p> </p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p display: list-item; list-style-position: inside;text-align:center;"></p>
              </td>
              <td>
                <p>Memo of Parties</p>
              </td>
              <td style="text-align:center;">
                <p> </p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p display: list-item; list-style-position: inside;text-align:center;"></p>
              </td>
              <td>
                <p>Synopsis & List of Dates</p>
              </td>
              <td style="text-align:center;">
                <p> </p>
              </td>
            </tr>
            ${annexuresNoList.map((item) => item)}
          </table>

          <br/>

          <p style="text-align:right;"><strong>FILED BY</strong></p>
          <p style="text-align:right;"><strong>${req.body.advocateFilledBy.toUpperCase()}</strong></p>
          <p style="text-align:right;"><strong>${req.body.advocateAddress1.toUpperCase()}</strong></p>
          <p style="text-align:right;"><strong>${req.body.advocateAddress2.toUpperCase()}</strong></p>

          <br/>

          <p><strong>${req.body.place.toUpperCase()}</strong></p>

          <p><strong>${req.body.date}</strong></p>

      </body>
      </html>`;

    const data = await HTMLtoDOCX(content, null, {
      table: { row: { cantSplit: true } },
      pageNumber: true,
      fontSize: 26,
      font: "Bookman Old Style",
      pageSize: {
        width: "21cm",
        height: "29.7cm;",
      },
    });

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
