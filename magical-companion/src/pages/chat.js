import React from 'react';
import GenerativeAIChat from '../components/gemini';
import ResponsiveAppBar from '../components/header';
import BackButton from '../components/backbtn';

function Chat() {
  return (
    <div className="page-container">
      <ResponsiveAppBar />
      <BackButton />
      <GenerativeAIChat />
    </div>
  );
}

export default Chat;