const EditorHtml = ({ local }) => {
  return (
    <div className="preview" dangerouslySetInnerHTML={{ __html: local }} />
  );
};

export default EditorHtml;
