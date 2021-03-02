import uniqid from 'uniqid';

export const defaultBoardData = {
    columns: [
        {
            id: uniqid(),
            name: 'backlog',
            cards: [
                {id: uniqid(),
                text: 'test1'},
                {id: uniqid(),
                    text: 'test2'}
            ],
        },
        {
            id: uniqid(),
            name: 'Design',
            cards: [{id: uniqid(),
                text: 'test3'}],
        },
        {
            id: uniqid(),
            name: 'To Do',
            cards: [
                {id: uniqid(),
                text: 'test4'}],
        },
        {
            id: uniqid(),
            name: 'Doing',
            cards: [
                {id: uniqid(),
                text: 'test5'},
                {id: uniqid(),
                text: 'test6'}],
        }
    ]

}