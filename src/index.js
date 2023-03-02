import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './indexMobile.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotesContextProvider } from './pages/Context/NotesContext';
import { AuthContextProvider } from './pages/Context/AuthContext';
import { BookNotesContextProvider } from './pages/Context/BookNotesContext';
import { ActivePageContextProvider } from './pages/Context/ActivePageContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ActivePageContextProvider>
    <AuthContextProvider>
    <NotesContextProvider>
      <BookNotesContextProvider>
        <App />
      </BookNotesContextProvider>
    </NotesContextProvider>
    </AuthContextProvider>
    </ActivePageContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
