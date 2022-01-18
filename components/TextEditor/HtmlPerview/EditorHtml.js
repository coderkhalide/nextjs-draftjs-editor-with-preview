const EditorHtml = ({ local }) => {
  return (
    <>
      <h1 className="text-center pt-4 text-xl">Preview</h1>
      <div className="preview" dangerouslySetInnerHTML={{ __html: local }} />
    </>
  );
};

export default EditorHtml;
