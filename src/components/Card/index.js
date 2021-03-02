import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Card({ id, cardName, index}) {
    return (
        // draggableId and index are required props in Draggable Component
        // Index must be unique within a Droppable component
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='btn btn-secondary mt-2'
                    key={id}
                >
                {cardName}
                </div>
            )}
        </Draggable>
    );
}
