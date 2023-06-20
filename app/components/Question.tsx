'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import Spinner from './Spinner';

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
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <input
          disabled={isloading}
          type="text"
          value={value}
          placeholder="Ask a question"
          onChange={e => setValue(e.target.value)}
          className="border border-black/20 px-4 py-2 text-lg rounded-tl-lg rounded-bl-lg"
        />
        <button
          className="border border-black/20 bg-blue-500 px-4 py-2 rounded-tr-lg rounded-br-lg text-lg "
          disabled={isloading}
        >
          Ask
        </button>
      </form>

      {isloading && (
        <div className='absolute bottom-[-20px] left-4'>
          <Spinner />
        </div>
      )}
      {response && <div className="mt-4">{response}</div>}
    </div>
  ); 
};

export default Question;
