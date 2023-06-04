import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { articleTemplate } from "./template";

interface IProps {
  editorRef: React.MutableRefObject<Editor | null>;
  initialValue?: string;
  readonly?: boolean;
}
const RichEditor: React.FC<IProps> = ({
  initialValue = `<p>Напишите статью про что-нибудь интересное</p>`,
  readonly = true,
  editorRef,
}) => {
  let initOptions = {};
  if (readonly) {
    initOptions = {
      height: "calc(100vh - 70px)",
      menubar: false,
      toolbar: false, // Отключение панели инструментов
      readonly: true,
    };
  } else {
    initOptions = {
      selector: "textarea",
      font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
      plugins: [
        "a11ychecker",
        "advlist",
        "advcode",
        "advtable",
        "autolink",
        "checklist",
        "export",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "powerpaste",
        "fullscreen",
        "formatpainter",
        "insertdatetime",
        "media",
        "table",
        "help",
        "wordcount",
      ],
      toolbar:
        "undo redo | fontfamily casechange blocks fontsize | bold italic backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
    };
  }

  return (
    <>
      <Editor
        // @ts-ignore
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          ...initOptions,
        }}
      />
    </>
  );
};
export default RichEditor;
