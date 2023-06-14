import React, {createContext, useState} from 'react';

const EventContext = createContext({
  uploading: false,
  messageTitle: '',
  message: '',
  splash: true,
  startingUpload: () => {},
  finishedUpload: () => {},
  setMessage: (_newMessage: string, _title: string) => {},
  clearMessage: () => {},
  endSplash: () => {},
});

export const EventProvider = ({children}: any) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [splash, setSplash] = useState(true);

  const eventInternalContext = {
    uploading,
    messageTitle,
    message,
    splash,
    startingUpload: function () {
      setUploading(true);
    },
    finishedUpload: function () {
      setUploading(false);
    },
    setMessage: function (newMessage: string, title: string) {
      setMessage(newMessage);
      setMessageTitle(title);
    },
    clearMessage: function () {
      eventInternalContext.setMessage('', '');
    },
    endSplash: function () {
      setSplash(false);
    },
  };

  return (
    <EventContext.Provider value={eventInternalContext}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
