var multer = require("multer");
const fs = require("fs");

import {
  Document,
  Packer,
  TextRun,
  AlignmentType,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  SectionType,
  PageNumber,
  TableOfContents,
  NumberFormat,
  Header,
  ImportDotx,
  ImageRun,
} from "docx";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Blob } from "buffer";
import { saveAs } from "file-saver";
import path from "path";
import getConfig from "next/config";

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

const importDotx = new ImportDotx();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const courtName = req.body.courtName.toUpperCase();
    const juridiction = req.body.juridiction.toUpperCase();
    const petitionNumber = req.body.petitionNumber.toUpperCase();

    const petitionerName = req.body.petitionerName.toUpperCase();
    const responsentName = req.body.responsentName.toUpperCase();

    const advocateFilledBy = req.body.advocateFilledBy.toUpperCase();
    const advocateAddress1 = req.body.advocateAddress1.toUpperCase();
    const advocateAddress2 = req.body.advocateAddress2.toUpperCase();
    const annexuresContent = req.body.annexuresContent;

    const place = req.body.place.toUpperCase();
    const date = req.body.date;

    const isUregent = req.body.isUregent;

    const annexuresNo = req.body.annexuresNo;

    const { serverRuntimeConfig } = getConfig();

    const dirRelativeToPublicFolder = "template";

    const dir = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./public",
      dirRelativeToPublicFolder
    );

    const filePath = `${dir}/template.dotx`;

    const fileName = `alwin.docx`;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw new Error(`Failed to read file ${filePath}.`);
      }

      importDotx.extract(data).then((templateDocument) => {
        const doc = new Document(
          {
            sections: [
              {
                properties: {
                  titlePage: templateDocument.titlePageIsDefined,
                },
                children: [],
              },
            ],
          },
          {
            template: templateDocument,
          }
        );

        Packer.toBuffer(doc).then(async (buffer) => {
          const storageRef = ref(storage, `docx/${fileName}`);

          uploadBytes(storageRef, buffer).then((snapshot) => {
            getDownloadURL(ref(storage, `docx/${fileName}`)).then((url) => {
              res.status(200).json({ url: url });
            });
          });
        });
      });
    });
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}
