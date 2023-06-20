'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder="Ask a question"
          onChange={e => setValue(e.target.value)}
          className="border border-black/20 px-4 py-2 text-lg rounded-tl-lg rounded-bl-lg"
        />
        <button className="border border-black/20 bg-blue-500 px-4 py-2 rounded-tr-lg rounded-br-lg text-lg ">
          Ask
        </button>
      </form>
    </div>
  );
};

export default Question;
