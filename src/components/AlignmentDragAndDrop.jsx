import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function AlignmentDragAndDrop({ greekSentence, englishSentence }) {
  const [greekWords, setGreekWords] = useState([]);
  const [englishWords, setEnglishWords] = useState([]);

  const handleOnDragEnd = (result) => {
    // If the word was dropped outside of a droppable area, don't do anything
    if (!result.destination) {
      return;
    }

    // Get the source and destination indices from the drag result
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Make a copy of the words arrays
    const newGreekWords = [...greekWords];
    const newEnglishWords = [...englishWords];

    // Move the word from the source index to the destination index
    newGreekWords.splice(destinationIndex, 0, newGreekWords.splice(sourceIndex, 1)[0]);
    newEnglishWords.splice(destinationIndex, 0, newEnglishWords.splice(sourceIndex, 1)[0]);

    // Update the state with the new word arrays
    setGreekWords(newGreekWords);
    setEnglishWords(newEnglishWords);
  };

  return (
    <div>
      <h1>Alignment Interface</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="greek">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {greekSentence.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <span>{word}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="english">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {englishSentence.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <span>{word}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default AlignmentDragAndDrop;
