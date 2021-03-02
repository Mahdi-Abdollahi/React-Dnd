import React, { useState } from 'react';
import { Column } from '../../components/Column';
import { defaultBoardData } from '../../utils/constants';
import AddCardModal from '../../components/AddCardModal';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import produce from 'immer';
import uniqid from 'uniqid';

function HomePage() {
    const [board, setBoard] = useState(defaultBoardData);
    const [showModal, setShowModal] = useState(false);
    const [cardName, setCardName] = useState("");
    const [columnId , setColumnId ] = useState(0);
    // let columnId = 0;
    
    const addListHandler = () => {
        const listName = prompt('Enter List name');
        const newList = {
            id: uniqid(),
            name: listName,
            cards: [],
        }
        const _board = produce(board, (draft) => {
            draft.columns.push(newList);
        });
        setBoard(_board);
    }

    const removeListHandler = (_columnId) => {
        const selectedColumnIndex = board.columns.findIndex(column => column.id === _columnId);
        const _board = produce(board, (draft) => {
            draft.columns.splice(selectedColumnIndex, 1);
        });
        setBoard(_board);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        console.log(showModal);
    }

    const openModalHandler = (_columnId) => {
        setShowModal(true);
        setColumnId(_columnId);
    }

    const onCardNameChangeHandler = (e) => {
        setCardName(e.target.value);
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!cardName) return alert('Input can\'t be empty');
        
        console.log(columnId);
        const selectedColumnIndex = board.columns.findIndex( column => column.id === columnId);
        const _board = produce(board, (draft) => {
            draft.columns[selectedColumnIndex].cards.push({
                id: uniqid(),
                text: cardName
            });
        });
        
        setBoard(_board);
        closeModalHandler();
    }

    // To synchronously update your state to reflect the drag
    const onDragEnd = (result) => {

        const {destination, source, type} = result;


        if(!destination) return;

        if(destination.index === source.index && destination.droppableId === source.droppableId)
            return;


        if( type === 'card' ) {

            const startColumnIndex = board.columns.findIndex( column => column.id === source.droppableId);
            const destinationColumnIndex = board.columns.findIndex( column => column.id === destination.droppableId);

            const startColumn = board.columns[startColumnIndex];
            const destinationColumn = board.columns[destinationColumnIndex];

            const isColumnsTheSame = startColumnIndex === destinationColumnIndex;

            
            if(startColumn && destinationColumn){

                const _startCards = [...startColumn.cards];
                const _destinationCards = [...destinationColumn.cards];
                const dragedCard = startColumn.cards[source.index];

                if(isColumnsTheSame) {
                    _startCards.splice(source.index, 1);
                    _startCards.splice(destination.index, 0, dragedCard);


                } else {

                    _startCards.splice(source.index, 1);
                    _destinationCards.splice(destination.index, 0, dragedCard);
                }

                const _board = produce(board, (draft) => {
                    draft.columns[startColumnIndex].cards = [..._startCards];
                    if(!isColumnsTheSame){
                        draft.columns[destinationColumnIndex].cards = [..._destinationCards];
                    }
                });
                console.log('in 2 cols')
                setBoard(_board); 
            }
                
                
            return;
        }

        if(type === 'column') {
            const newColumnOrder = [...board.columns];    
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, board.columns[source.index]);
            
            
            const _board = produce(board, (draft) => {
                draft.columns = [...newColumnOrder];
            });

            setBoard(_board);

            return;
        }


        

    };

    return (
        <div className='container-fluid'>
            <button  onClick={addListHandler}>Add another list</button>

            {/* // Only required callback in DragDropContext */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='all-columns' direction='horizontal' type='column' >
                    { provided => (
                        <div 
                        className="d-flex justify-content-center"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {board.columns.map( (column, index) => {
                                if(!column)
                                    console.log('not found');
                                return <Column 
                                            key={column.id} 
                                            removeCard={removeListHandler} 
                                            openModal={openModalHandler} 
                                            cards={column.cards} 
                                            id={column.id} 
                                            index={index}
                                            name={column.name} 
                                        />
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </DragDropContext>

            <AddCardModal 
                open={showModal} 
                closeModal={closeModalHandler} 
                checkInput={onCardNameChangeHandler}
                submitForm={onSubmitHandler}
            />
        </div>
    );
}

export default HomePage;