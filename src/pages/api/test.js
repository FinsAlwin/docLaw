import path from "path";
import createReport from "docx-templates";
import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const dir = path.join("./public/files");
    const dirTemp = path.join("./public/template");
    const template = fs.readFileSync(`${dirTemp}/template1.docx`);

    console.log(template);

    const fileName = `alwin.docx`;

    const documentPath = `${dir}/${fileName}`;

    const buffer = createReport({
      template,
      data: {
        name: "John",
        surname: "Appleseed",
      },
    });

    fs.writeFileSync(documentPath, buffer, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });

    res.status(200).json({ url: `files/alwin.docx` });
  } else {
    res.status(400).json({ message: "Invaild Method" });
  }
}
