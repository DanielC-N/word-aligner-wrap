import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function AlignmentBetterDragAndDrop({ greekSentence, englishSentence }) {
  let greekSentenceArray = [];
  let englishSentenceArray = [];
  if(typeof greekSentence === "string") {
    greekSentenceArray = greekSentence.split(" ");
  } else if (typeof greekSentence === "object") {
    greekSentenceArray = greekSentence;
  }
  if(typeof englishSentence === "string") {
    englishSentenceArray = englishSentence.split(" ");
  } else if (typeof englishSentence === "object") {
    englishSentenceArray = englishSentence;
  }
  const [greekWords, setGreekWords] = useState(greekSentenceArray);
  const [englishWords, setEnglishWords] = useState(englishSentenceArray);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.index === destination.index) {
      return;
    }

    const newGreekWords = [...greekWords];
    const newEnglishWords = [...englishWords];

    const [removed] = newGreekWords.splice(source.index, 1);
    newGreekWords.splice(destination.index, 0, removed);

    const [removed2] = newEnglishWords.splice(source.index, 1);
    newEnglishWords.splice(destination.index, 0, removed2);

    setGreekWords(newGreekWords);
    setEnglishWords(newEnglishWords);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="sentence-container">
        <Droppable droppableId="greek">
          {(provided, snapshot) => (
            <div
              className={`sentence ${
                snapshot.isDraggingOver ? "dragging-over" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {greekWords.map((word, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`word ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
          {(provided, snapshot) => (
            <div
              className={`sentence ${
                snapshot.isDraggingOver ? "dragging-over" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {englishWords.map((word, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`word ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{word}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default AlignmentBetterDragAndDrop;
