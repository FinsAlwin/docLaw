var multer = require("multer");
const fs = require("fs");
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TextDirection,
  TextRun,
  SectionType,
  AlignmentType,
  FrameAnchorType,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  Tab,
  TabStopType,
  TabStopPosition,
} from "docx";
import path from "path";
import getConfig from "next/config";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Blob } from "buffer";
import { saveAs } from "file-saver";

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
  if (req.method === "GET") {
    const { serverRuntimeConfig } = getConfig();

    const dirRelativeToPublicFolder = "files";

    const dir = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./public",
      dirRelativeToPublicFolder
    );

    const paragraphCourtName = new Paragraph({
      children: [
        new TextRun({
          text: `test`,
          bold: true,
          font: "Bookman Old Style",
          size: 26,
          color: "000000",
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 70,
        after: 70,
      },
    });

    const doc = new Document({
      sections: [
        {
          children: [paragraphCourtName],
        },
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      const fileName = `alwin.docx`;
      const storageRef = ref(storage, `docx/${fileName}`);

      uploadBytes(storageRef, buffer).then((snapshot) => {
        getDownloadURL(ref(storage, `docx/${fileName}`)).then((url) => {
          res.status(200).json({ url: url });
        });
      });
    });
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}
