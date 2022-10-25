import React, {useState} from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

export default function AnyComponent() {
    const [language, setLanguage] = useState('pt-BR');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        crossBrowser: true,
        // googleApiKey: '',
        useLegacyResults: false,
        speechRecognitionProperties: {
            lang: language,
            interimResults: true
        }
    });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      <label>Language: </label>
      <select onChange={event => (setLanguage(event.target.value))}>
        <option value="pt-BR">Portuguese</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
}