import React from "react";
import styled from "styled-components";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prism-themes/themes/prism-atom-dark.css";
import React from "react";
import ReactDOM from "react-dom";
import JSONViewer from "./JSONViewer";

interface JSONViewerProps {
  data: Record<string, unknown>;
  fontSize?: number;
  padding?: number;
  backgroundColor?: string;
}

const JSONViewer: React.FC<JSONViewerProps> = ({
  data,
  fontSize = 14,
  padding = 10,
  backgroundColor = "black",
}) => {
  return (
    <StyledEditor
      value={JSON.stringify(data, null, 4)}
      highlight={(code) => Prism.highlight(code, Prism.languages.json, "json")}
      padding={padding}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      onValueChange={() => {
        // Read-only mode, no value changes handled
      }}
    />
  );
};

export default JSONViewer;

const StyledEditor = styled(Editor)<{
  backgroundColor: string;
  fontSize: number;
}>`
  background: ${({ backgroundColor }) => backgroundColor};
  font-family: "Fira Code", "Fira Mono", monospace;
  font-size: ${({ fontSize }) => fontSize}px;
  color: #ffffff;
  min-height: 100px;

  &:focus {
    outline: none;
  }
`;


const App = () => {
  const jsonData = {
    name: "Example",
    version: "1.0.0",
    dependencies: {
      react: "^17.0.2",
      typescript: "^4.5.4",
    },
  };

  return (
    <div>
      <h1>JSON Viewer</h1>
      <JSONViewer data={jsonData} fontSize={16} backgroundColor="#1e1e1e" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
