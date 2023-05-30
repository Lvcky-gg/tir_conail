import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import { ModalProvider, Modal } from "./context/Modal";
import store from "./store";
import App from "./App";
//MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "./index.css";
const customTheme = createTheme({
	//theme settings
	palette:{
		primary:{
			main:'#3c3c3c'
		},
		secondary:{
			main:'#0c0040a'
		},
		error:{
			main:'#55083f'
		}
},
typography: {
	fontFamily: [
	  '-apple-system',
	  'BlinkMacSystemFont',
	  '"Segoe UI"',
	  'Roboto',
	  '"Helvetica Neue"',
	  'Arial',
	  'sans-serif',
	  '"Apple Color Emoji"',
	  '"Segoe UI Emoji"',
	  '"Segoe UI Symbol"',
	].join(',')
}
});


// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	const [hidden, setHidden] = useState(false)
	return (
		<ThemeProvider theme={customTheme}>
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App hidden={hidden} setHidden={setHidden}/>
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
		</ThemeProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);