import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { draftToMarkdown } from "markdown-draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorHtml from "./HtmlPerview/EditorHtml";
import DraftToMarkdown from "./DraftToMarkdown/DraftToMarkdown";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedRaw, setConvertedRaw] = useState(null);
  const [local, setLocal] = useState();

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  // Localstroage setItem Function
  const saveContent = (content) => {
    localStorage?.setItem("body", JSON.stringify(content));
  };

  useEffect(() => {
    const blocks = JSON.parse(localStorage?.getItem("body"));
    if (blocks) {
      setEditorState(EditorState.createWithContent(convertFromRaw(blocks)));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  useEffect(() => {
    let rawObject = convertToRaw(editorState?.getCurrentContent());
    draftTMarkdown(rawObject);
    saveContent(rawObject);
  }, [editorState]);

  useEffect(() => {
    const body = draftToHtml(JSON.parse(localStorage?.getItem("body")));
    setLocal(body);
  }, [editorState]);

  const draftTMarkdown = (markdown) => {
    const markdownString = draftToMarkdown(markdown);
    setConvertedRaw(markdownString);
  };

  return (
    <article className="prose prose-lg textEditor">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <EditorHtml local={local} />
      {/* <DraftToMarkdown convertedRaw={convertedRaw} /> */}
    </article>
  );
};
export default TextEditor;
