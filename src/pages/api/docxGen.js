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
  ImageRun,
} from "docx";

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

const image =
  "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";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { serverRuntimeConfig } = getConfig();

    // const dirRelativeToPublicFolder = "template";

    // const dir = path.join(
    //   serverRuntimeConfig.PROJECT_ROOT,
    //   "./public",
    //   dirRelativeToPublicFolder
    // );

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

    const heading = (title) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: title,
            font: "Bookman Old Style",
            bold: true,
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
    };

    const mainHeading = (courtName, juridiction, petitionNumber) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: courtName,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
          }),
          new TextRun({
            text: juridiction,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 2,
          }),
          new TextRun({
            text: petitionNumber,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 2,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      });
    };

    const tableVs = () => {
      return new Table({
        columnWidths: [6000, 4000],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: petitionerName,
                        bold: false,
                        font: "Bookman Old Style",
                        size: 26,
                        color: "000000",
                      }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
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
                    alignment: AlignmentType.CENTER,
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
                    alignment: AlignmentType.CENTER,
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
                    alignment: AlignmentType.CENTER,
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
        width: { size: 100, type: "pct" },
      });
    };

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
      columnWidths: [2000, 5000, 3000],
      rows: childrenIndex,
      alignment: AlignmentType.CENTER,
      width: { size: 100, type: "pct" },
      borders: {
        color: "000000",
      },
    });

    const filledBy = (advocateFilledBy, advocateAddress1, advocateAddress2) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: "FILED BY",
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
          }),
          new TextRun({
            text: advocateFilledBy,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 2,
          }),
          new TextRun({
            text: advocateAddress1,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 1,
          }),
          new TextRun({
            text: advocateAddress2,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 1,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.RIGHT,
      });
    };

    const datePlace = (date, place) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: place,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
          }),
          new TextRun({
            text: date,
            font: "Bookman Old Style",
            bold: true,
            size: 26,
            color: "000000",
            break: 1,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.LEFT,
      });
    };

    const annexuresContentGen = (no) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: `ANNEXURES PT-${no}`,
            bold: true,
          }),
          new ImageRun({
            data: annexuresContent[`annexuresNo${no}`].file,
            transformation: {
              width: 600,
              height: 900,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
      });
    };

    let annexuresArray = [];

    const listAnnexuresContent = (annexuresNo) => {
      for (let step = 1; step <= annexuresNo; step++) {
        annexuresArray.push(annexuresContentGen(annexuresNo));
      }
    };

    await listAnnexuresContent(annexuresNo);

    const firstPage = {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.DECIMAL,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Bookman Old Style",
                  bold: true,
                  size: 26,
                  color: "000000",
                }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),
      },
      children: [
        mainHeading(courtName, juridiction, petitionNumber),
        tableVs(),
        heading("INDEX"),
        tableIndex,
        filledBy(advocateFilledBy, advocateAddress1, advocateAddress2),
        datePlace(date, place),
      ],
    };

    const urgent = {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.DECIMAL,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Bookman Old Style",
                  bold: true,
                  size: 26,
                  color: "000000",
                }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),
      },
      children: [
        mainHeading(courtName, juridiction, petitionNumber),
        tableVs(),

        filledBy(advocateFilledBy, advocateAddress1, advocateAddress2),
        datePlace(date, place),
      ],
    };

    const annexuresArrayItem = {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.DECIMAL,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Bookman Old Style",
                  bold: true,
                  size: 26,
                  color: "000000",
                }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),
      },
      children: annexuresArray,
    };

    const document = () => {
      if (isUregent) {
        return [firstPage, urgent, annexuresArrayItem];
      } else {
        return [firstPage, annexuresArrayItem];
      }
    };

    const doc = await new Document({
      sections: document(),
      pageSize: { width: 11906, height: 16838 },
    });

    const fileName = `alwin.docx`;

    await Packer.toBuffer(doc).then(async (buffer) => {
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
