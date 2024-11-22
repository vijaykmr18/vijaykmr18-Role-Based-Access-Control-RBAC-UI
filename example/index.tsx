import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider, withStyles } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
import { purple } from '@mui/material/colors';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Rbac from '../src';
import JSONViewer from './viewer';
import { PermissionsObject } from '../src/types';

// Theme customization
export const theme = createTheme({
    palette: {
        primary: {
            main: '#4994E4',
            light: '#3C74C3',
        },
        info: {
            main: '#D6EBFF',
        },
        text: {
            primary: '#363C44',
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    padding: '5px 15px',
                    borderBottom: 0,
                },
            },
        },
    },
});

// RBAC data
const data = {
    _resources: {
        example1: { name: 'Resource 1', _resources: {} },
        example2: { name: 'Resource 2', _resources: {} },
    },
    _roles: {
        user: { permissions: ['example1'] },
        admin: { permissions: ['example2'] },
    },
};

// Styled Button with Material-UI and custom styles
const StyledButton = withStyles(() => ({
    root: {
        color: purple[50],
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

// Button with Icon
const ButtonWithIcon = (props: ButtonProps) => (
    <StyledButton onClick={props.onClick}>
        <CheckIcon />
    </StyledButton>
);

// Custom styled Add Icon
const AddIcon = styled(AddCircleOutlineIcon)`
    color: red;
    margin: 5px;

    &:hover {
        color: black;
    }
`;

const App: React.FC = () => {
    const [rbacData, setRbacData] = React.useState<PermissionsObject>(data);

    const handleChange = (value: PermissionsObject) => {
        setRbacData(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ color: theme.palette.primary.main }}>RBAC Playground</h1>
                <Rbac
                    defaultValue={data}
                    onChange={handleChange}
                    buttons={{
                        saveButton: ButtonWithIcon,
                    }}
                    icons={{
                        treeNodeIcon: AddIcon,
                        treeParentIcon: AddIcon,
                    }}
                />
                <div style={{ marginTop: '20px' }}>
                    <h2>RBAC Data Viewer</h2>
                    <JSONViewer data={rbacData} />
                </div>
            </div>
        </ThemeProvider>
    );
};
import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider, Button } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import JSONViewer from './JSONViewer';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4994E4',
      light: '#3C74C3',
    },
    info: {
      main: '#D6EBFF',
    },
    text: {
      primary: '#363C44',
    },
  },
});

const initialData = {
  _resources: {
    resource1: {
      name: 'Resource 1',
      _resources: {},
    },
  },
  _roles: {
    user: {
      permissions: ['resource1'],
    },
    admin: {
      permissions: ['resource1'],
    },
  },
};

const colorButton = styled(Button)`
  background-color: ${purple[500]};
  &:hover {
    background-color: ${purple[700]};
  }
`;

const App = () => {
  const [rbacData, setRbacData] = useState(initialData);

  const handleChange = (value: any) => {
    setRbacData(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>RBAC UI Manager</h1>
        <colorButton
          onClick={() => {
            // Example to add role or resource
            const updatedData = { ...rbacData };
            updatedData._roles.admin.permissions.push('resource2');
            setRbacData(updatedData);
          }}
        >
          <CheckIcon /> Add Permission
        </colorButton>

        <JSONViewer data={rbacData} />
      </div>
    </ThemeProvider>
  );
};

export default App;
import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prism-themes/themes/prism-atom-dark.css';
import styled from 'styled-components';

const JSONViewer = ({ data }: any) => {
  return (
    <StyledEditor
      value={JSON.stringify(data, null, 4)}
      highlight={(code: string) =>
        Prism.highlight(code || '', Prism.languages.json, 'json')
      }
      padding={10}
      onValueChange={() => {}}
    />
  );
};

export default JSONViewer;

const StyledEditor = styled(Editor)`
  background: black;
  font-family: 'Fira code', 'Fira Mono', monospace;
  font-size: 14px;
  min-height: 100px;
  color: white;
  padding: 10px;

  & :focus {
    outline: none;
  }
`;


ReactDOM.render(<App />, document.getElementById('root'));
