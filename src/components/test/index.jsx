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
  WidthType,
  BorderStyle,
} from "docx";

import { saveAs } from "file-saver";
export default function Test() {
  const paragraph1 = new Paragraph({
    children: [
      new TextRun({
        text: "HIGHCOURT",
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

  const paragraph2 = new Paragraph({
    children: [
      new TextRun({
        text: "JURIDICTION",
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

  const paragraph3 = new Paragraph({
    children: [
      new TextRun({
        text: "PETITIONNUMBER",
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

  const paragraph4 = new Paragraph({
    children: [
      new TextRun({
        text: "IN THE MATTER OF:",
        bold: true,
        font: "Bookman Old Style",
        size: 26,
        color: "000000",
        underline: { type: "single", color: "000000" },
      }),
    ],
    heading: HeadingLevel.HEADING_1,
    spacing: {
      before: 70,
      after: 100,
    },
  });

  const table = new Table({
    columnWidths: [6000, 3000],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PETITIONERNAME",
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
                    text: "RESPONDENTNAME",
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

  const paragraphTable = new Paragraph({
    children: [table],
    heading: HeadingLevel.HEADING_1,
    spacing: {
      before: 70,
    },
  });

  const paragraphIndex = new Paragraph({
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

  const paragraphTableIndex = new Paragraph({
    children: [tableIndex],
    heading: HeadingLevel.HEADING_1,
    spacing: {
      before: 70,
    },
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              paragraph1,
              paragraph2,
              paragraph3,
              paragraph4,
              paragraphTable,
              paragraphIndex,
              paragraphTableIndex,
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    const blob = new Blob([buffer]);
    saveAs(blob, `zsdfxcv.docx`);
  });

  return <>test</>;
}
