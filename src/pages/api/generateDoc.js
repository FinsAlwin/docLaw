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

export default function handler(req, res) {
  if (req.method === "POST") {
    const dir = path.join("./public/files");

    const courtName = req.body.courtName.toUpperCase();
    const juridiction = req.body.juridiction.toUpperCase();
    const petitionNumber = req.body.petitionNumber.toUpperCase();

    const petitionerName = req.body.petitionerName.toUpperCase();
    const responsentName = req.body.responsentName.toUpperCase();

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
      columnWidths: [6000, 3000],
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
          cantSplit: true,
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
    });

    const paragraphVersus = new Paragraph({
      children: [tableVersus],
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 70,
      },
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

    const tableIndex = new Table({
      columnWidths: [1000, 6000],
      rows: [
        new TableRow({
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
        }),
      ],
    });

    const indexTable = new Paragraph({
      children: [tableIndex],
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 70,
      },
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              children: [
                paragraphCourtName,
                paragraphJuridiction,
                paragraphPetitionNumber,
                paragraphVersus,
                indexText,
                indexTable,
              ],
            }),
          ],
        },
      ],
    });

    const fileName = `alwin.docx`;
    const documentPath = `${dir}/${fileName}`;

    Packer.toBuffer(doc).then(async (buffer) => {
      fs.writeFileSync(documentPath, buffer, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    res.status(200).json({ url: `files/${fileName}` });
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}
