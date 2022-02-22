import React, { useEffect, useState } from 'react';

const backend = 'https://gecbackend.herokuapp.com/';
//const backend = 'http://localhost:5000';

export default function Home() {
  const [prediction, setPrediction] = useState(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(backend)
      .then((res) => res.json())
      .then((data) => console.log('Heroku awake!', data));
  }, []);

  const getPrediction = async (sentence) => {
    if (loading) return;
    console.log('getting prediction');
    setLoading(true);
    const res = await fetch(`${backend}/model?sentence=${sentence}`);
    const data = await res.json();
    setPrediction(data[0]);
    setLoading(false);
  };

  return (
    <div className="container mt-3 mx-auto w-max max-w-full shadow-lg rounded-lg bg-blue-100 p-8">
      <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-red-600">
        Grammatical error correction
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getPrediction(e.target.sentence.value);
        }}
      >
        Enter text and press correct
        <textarea
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          cols="50"
          rows="5"
          id="sentence"
          className="block border-2 p-2 shadow-inner rounded-md border-gray-800"
        />
        <button
          type="submit"
          className="mt-3 block p-2 rounded-md bg-green-400 hover:bg-green-500 transition-colors"
        >
          Correct
        </button>
        {loading && 'Loading...'}
        {prediction !== undefined && (
          <div className="mt-3">
            Predicted correction
            <textarea
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              className="block border-2 p-2 shadow-inner rounded-md border-gray-800"
              name="prediction"
              id="prediction"
              cols="50"
              rows="5"
              value={prediction}
            ></textarea>
          </div>
        )}
      </form>
    </div>
  );
}
