import React, { useState } from 'react';

function AlignmentInterface() {
  // Define state to hold the list of alignments
  const [alignments, setAlignments] = useState([]);

  // Define a function to handle adding a new alignment
  function handleAddAlignment(greekWord, englishWord) {
    setAlignments([
      ...alignments,
      { greek: greekWord, english: englishWord },
    ]);
  }

  // Define a function to handle removing an alignment
  function handleRemoveAlignment(index) {
    setAlignments(alignments.filter((_, i) => i !== index));
  }

  return (
    <div>
      {/* Render the list of alignments */}
      <ul>
        {alignments.map((alignment, index) => (
          <li key={index}>
            {alignment.greek} - {alignment.english}{' '}
            <button onClick={() => handleRemoveAlignment(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Render the input fields for adding a new alignment */}
      <div>
        <input type="text" placeholder="Greek word" id="greek" />
        <input type="text" placeholder="English word" id="english" />
        <button onClick={
            () => handleAddAlignment(document.getElementById("greek").value, document.getElementById("english").value)
          }>
          Add alignment
        </button>
      </div>
    </div>
  );
}

export default AlignmentInterface;