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
  EmbeddedObject,
  addSection,
  Media,
} from "docx";
import path from "path";
import getConfig from "next/config";

const docx = require("docx");

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
  if (req.method === "POST") {
    // const dir = path.join("/public/files");

    const { serverRuntimeConfig } = getConfig();

    // const dirRelativeToPublicFolder = "files";

    const dirRelativeToPublicFolder = "template";

    // const dir = path.join(process.cwd(), "public/files");

    const dir = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./public",
      dirRelativeToPublicFolder
    );

    const courtName = req.body.courtName.toUpperCase();
    const juridiction = req.body.juridiction.toUpperCase();
    const petitionNumber = req.body.petitionNumber.toUpperCase();

    const petitionerName = req.body.petitionerName.toUpperCase();
    const responsentName = req.body.responsentName.toUpperCase();

    const isUregent = req.body.isUregent;

    const annexuresNo = req.body.annexuresNo;

    if (petitionNumber) {
      const paragraphCourtName = new Paragraph({
        children: [
          new TextRun({
            text: `${courtName}`,
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

      const paragraphJuridiction = new Paragraph({
        children: [
          new TextRun({
            text: `${juridiction}`,
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

      const paragraphPetitionNumber = new Paragraph({
        children: [
          new TextRun({
            text: `${petitionNumber}`,
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

      const tableVersus = new Table({
        columnWidths: [6000, 4000],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${petitionerName}`,
                        bold: false,
                        font: "Bookman Old Style",
                        size: 26,
                        color: "000000",
                      }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                      before: 70,
                      after: 70,
                    },
                  }),
                ],
                borders: {
                  left: {
                    color: "FFFFFF",
                  },
                  right: {
                    color: "FFFFFF",
                  },
                  top: {
                    color: "FFFFFF",
                  },
                  bottom: { color: "FFFFFF" },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "…PETITIONER",
                        bold: false,
                        font: "Bookman Old Style",
                        size: 26,
                        color: "000000",
                      }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                      before: 70,
                      after: 70,
                    },
                  }),
                ],
                borders: {
                  left: {
                    color: "FFFFFF",
                  },
                  right: {
                    color: "FFFFFF",
                  },
                  top: {
                    color: "FFFFFF",
                  },
                  bottom: { color: "FFFFFF" },
                },
              }),
            ],
            height: { value: 500 },
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "VERSUS",
                        bold: false,
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
                  }),
                ],
                borders: {
                  left: {
                    color: "FFFFFF",
                  },
                  right: {
                    color: "FFFFFF",
                  },
                  top: {
                    color: "FFFFFF",
                  },
                  bottom: {
                    color: "FFFFFF",
                  },
                },
                columnSpan: 2,
              }),
            ],
            height: { value: 500 },
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${responsentName}`,
                        bold: false,
                        font: "Bookman Old Style",
                        size: 26,
                        color: "000000",
                      }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                      before: 70,
                    },
                  }),
                ],
                borders: {
                  left: {
                    color: "FFFFFF",
                  },
                  right: {
                    color: "FFFFFF",
                  },
                  top: {
                    color: "FFFFFF",
                  },
                  bottom: { color: "FFFFFF" },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "…RESPONDENT",
                        bold: false,
                        font: "Bookman Old Style",
                        size: 26,
                        color: "000000",
                      }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                      before: 70,
                      after: 70,
                    },
                  }),
                ],
                borders: {
                  left: {
                    color: "FFFFFF",
                  },
                  right: {
                    color: "FFFFFF",
                  },
                  top: {
                    color: "FFFFFF",
                  },
                  bottom: { color: "FFFFFF" },
                },
              }),
            ],
            height: { value: 500 },
          }),
        ],
        alignment: AlignmentType.CENTER,
      });

      const indexText = new Paragraph({
        children: [
          new TextRun({
            text: "INDEX",
            bold: true,
            font: "Bookman Old Style",
            size: 26,
            color: "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 70,
        },
      });

      const indexTableHeading = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "S. No.",
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Particular",
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Page no.",
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
              }),
            ],
          }),
        ],
        height: { value: 500 },
      });

      const urgetTableRow = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: " ",
                    bold: true,
                    font: "Bookman Old Style",
                    size: 26,
                    color: "000000",
                    bullet: {
                      level: 0,
                    },
                  }),
                ],

                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: {
                  before: 70,
                  after: 70,
                },
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Urgent Application",
                    bold: false,
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
              }),
            ],
          }),
        ],
        height: { value: 500 },
      });

      const rowNoticeofMotion = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: " ",
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Notice of Motion",
                    bold: false,
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
              }),
            ],
          }),
        ],
        height: { value: 500 },
      });

      const rowMemoofParties = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: " ",
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Memo of Parties",
                    bold: false,
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
              }),
            ],
          }),
        ],
        height: { value: 500 },
      });

      const rowSynopsisLisDates = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: " ",
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Synopsis & List of Dates",
                    bold: false,
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
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
              }),
            ],
          }),
        ],
        height: { value: 500 },
      });

      let annexuresNoList = [];

      const listAnnexures = (annexuresNo) => {
        for (let step = 1; step <= annexuresNo; step++) {
          annexuresNoList.push(
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: " ",
                          bold: false,
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
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `ANNEXURE P-${step}:`,
                          bold: false,
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
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          bold: false,
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
                    }),
                  ],
                }),
              ],
              height: { value: 500 },
            })
          );
        }
      };

      listAnnexures(annexuresNo);

      const indexList = [
        indexTableHeading,
        isUregent && urgetTableRow,
        rowNoticeofMotion,
        rowMemoofParties,
        rowSynopsisLisDates,
      ];

      const childrenIndex = await indexList
        .filter(Boolean)
        .concat(annexuresNoList);

      const tableIndex = new Table({
        columnWidths: [1000, 6000],
        rows: childrenIndex,
        alignment: AlignmentType.CENTER,
      });

      // const doc = new Document({
      //   frame: {
      //     position: {
      //       x: 1000,
      //       y: 3000,
      //     },
      //     width: 4000,
      //     height: 1000,
      //     anchor: {
      //       horizontal: FrameAnchorType.MARGIN,
      //       vertical: FrameAnchorType.MARGIN,
      //     },
      //     alignment: {
      //       x: HorizontalPositionAlign.CENTER,
      //       y: VerticalPositionAlign.TOP,
      //     },
      //   },
      //   sections: [
      //     {
      //       children: [paragraphCourtName],
      //     },
      //   ],
      // });

      const fileName = `alwin.docx`;

      //from chatGPT

      // const base64Pdf = req.body.annexuresContent[`annexuresNo1`].file;

      // // Decode the base64-encoded string into a binary buffer
      // const pdfBuffer = Buffer.from(base64Pdf, "base64");

      // await new Media().addImage(doc, pdfBuffer, 300, 300, {
      //   cx: 300,
      //   cy: 300,
      // });

      //from template

      // await Packer.toBuffer(doc).then(async (buffer) => {
      //   const storageRef = ref(storage, `docx/${fileName}`);

      //   uploadBytes(storageRef, buffer).then((snapshot) => {
      //     getDownloadURL(ref(storage, `docx/${fileName}`)).then((url) => {
      //       res.status(200).json({ url: url });
      //     });
      //   });
      // });

      generateDocx(data);
    } else {
      res.status(401).json({ message: "missing parameter" });
    }
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}

async function generateDocx(data) {
  const { serverRuntimeConfig } = getConfig();

  // const dirRelativeToPublicFolder = "files";

  const dirRelativeToPublicFolder = "template";

  // const dir = path.join(process.cwd(), "public/files");

  const dir = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public",
    dirRelativeToPublicFolder
  );

  const fileName = `alwin.docx`;

  // Load the template file
  const templateBuffer = fs.readFileSync(`${dir}/template1.docx`);
  const doc = await new Document(templateBuffer);
  // await doc.load(templateBuffer);

  // Replace text in each paragraph
  doc.paragraphs.map((paragraph) => {
    paragraph.text = paragraph.text.replace("{{HIGHCOURT}}", "My Text");
  });

  // Create a table with dynamic content
  const table = doc.createTable({
    rows: data.length + 1,
    columns: 2,
  });

  // Add header row
  table.getCell(0, 0).addText("Name");
  table.getCell(0, 1).addText("Age");

  // Add data rows
  for (let i = 0; i < data.length; i++) {
    table.getCell(i + 1, 0).addText(data[i].name);
    table.getCell(i + 1, 1).addText(data[i].age.toString());
  }

  // Add the table to the document
  doc.addTable(table);

  // Pack the document into a buffer

  await Packer.toBuffer(doc).then(async (buffer) => {
    const storageRef = ref(storage, `docx/${fileName}`);

    uploadBytes(storageRef, buffer).then((snapshot) => {
      getDownloadURL(ref(storage, `docx/${fileName}`)).then((url) => {
        res.status(200).json({ url: url });
      });
    });
  });

  // Save the generated file to disk
}

// Example data
const data = [
  { name: "John Doe", age: 32 },
  { name: "Jane Doe", age: 28 },
];

//docx js example
