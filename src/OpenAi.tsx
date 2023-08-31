// Filename: OpenAIInput.tsx

import React, { useState } from 'react';
import { openaiService } from './services/openAi.service'// Adjust the import path as needed

const OpenAIInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const apiResponse = await openaiService.getCompletion(inputValue);  // Replace 'yourAPIMethod' with the appropriate method
      setResponse(apiResponse);
    } catch (error) {
      console.error("Error sending data to API:", error);
      setResponse('Error occurred.');
    }
  };

  return (
    <div style={{ border: '1px black solid', width: '300px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your query"
      />
      <button onClick={handleSubmit}>Send to API</button>
      {response && <div>Response: {response}</div>}
    </div>
  );
}

export default OpenAIInput;
