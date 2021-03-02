import React from 'react';
import Card from '../Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export function Column({id, name, cards, removeCard, openModal, index}) {
    return(
        <Draggable draggableId={id} index={index}>
            { provided => (
                <div
                    {...provided.draggableProps}               
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={id} 
                    className='shadow p-3 bg-body rounded border col-12 col-md-2 m-3 '>
                    <h5>{name}</h5>
                    <button onClick={() => removeCard(id)} className='btn btn-close'></button>
                    {/* Droppable has one require prop => 
                        droppableId(must be uniq whitin DragDropContext) */}
                    <Droppable droppableId={id} type='card'>
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='column d-grid gap-1 d-block'
                            >
                            {cards.map((card, index) => (
                                            <Card id={card.id} key={card.id} cardName={card.text} index={index} />
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <button onClick={() => openModal(id)} className='btn btn-primary mt-2'>Add a card</button>
                </div>
            )}
        </Draggable>
    );
}