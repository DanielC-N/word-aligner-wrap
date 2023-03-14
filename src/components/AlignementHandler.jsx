import React, { useState } from 'react';
import AlignmentInterface from './AlignmentInterface';
// import AlignmentDragAndDrop from './AlignmentDragAndDrop';
import AlignmentBetterDragAndDrop from './AlignmentBetterDragAndDrop';

function AlignementHandler() {
    // Define your greek and english sentences as arrays of words
    const greekSentence = ['ὁ', 'δοῦλος', 'Χριστοῦ', 'Ἰησοῦ', 'τοῖς', 'ἐν', 'Ρώμῃ', 'ἁγίοις'];
    const englishSentence = ['Paul', 'a', 'servant', 'of', 'Jesus', 'Christ', 'called', 'to', 'be', 'an', 'apostle', 'separated', 'unto', 'the', 'gospel', 'of', 'God'];
  
  const [greekText, setGreekText] = useState('');
  const [englishText, setEnglishText] = useState('');

  const handleGreekInputChange = (event) => {
    setGreekText(event.target.value);
  };

  const handleEnglishInputChange = (event) => {
    setEnglishText(event.target.value);
  };

  return (
    <div>
      <h1>Alignment handler</h1>
      <div>
        <h2>Greek</h2>
        <textarea value={greekText} onChange={handleGreekInputChange} />
      </div>
      <div>
        <h2>English</h2>
        <textarea value={englishText} onChange={handleEnglishInputChange} />
      </div>
      <AlignmentInterface />
      <AlignmentBetterDragAndDrop greekSentence={greekSentence} englishSentence={englishSentence} />
      {/* <AlignmentDragAndDrop greekSentence={greekSentence} englishSentence={englishSentence} /> */}
    </div>
  );
}

export default AlignementHandler;
