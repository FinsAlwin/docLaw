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
      after: 70,
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
            frame: {
              position: {
                x: 1000,
                y: 3000,
              },
              width: 4000,
              height: 1000,
              anchor: {
                horizontal: FrameAnchorType.MARGIN,
                vertical: FrameAnchorType.MARGIN,
              },
              alignment: {
                x: HorizontalPositionAlign.CENTER,
                y: VerticalPositionAlign.TOP,
              },
            },
            border: {
              top: {
                color: "auto",
                space: 1,
                value: "single",
                size: 6,
              },
              bottom: {
                color: "auto",
                space: 1,
                value: "single",
                size: 6,
              },
              left: {
                color: "auto",
                space: 1,
                value: "single",
                size: 6,
              },
              right: {
                color: "auto",
                space: 1,
                value: "single",
                size: 6,
              },
            },
            children: [paragraph1, paragraph2, paragraph3, paragraph4],
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
