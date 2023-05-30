import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

interface IProps {}
const RichEditor: React.FC<IProps> = () => {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      // @ts-ignore
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        // @ts-ignore
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`<ul class="tox-checklist"><li>This is the <strong>initial content</strong> of the editor.</li></ul>`}
        init={{
          height: 500,
          // ДЛя отображения статьи нужно расскоментировать код ниже и закоментировать все, что после него
          // menubar: false,
          // toolbar: false, // Отключение панели инструментов
          // readonly: true,
          // **

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
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};
export default RichEditor;
