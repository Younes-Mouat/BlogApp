const initState = {
    messages: [
        {id: '1', friend: 'Haroune', content: 'blah blah blah'},
        {id: '2', friend: 'Soulaymane', content:'Have u seen the last trailer of apex legends season 7 its cool man'},
        {id: '3', friend: 'Lina', content: 'fjvkjdslfj67t3jd'}
    ]
}

const messageReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD-MESSAGE':
            console.log('added message', action.message);
            return state;
        case 'ADD_MESSAGE_ERROR':
            console.log('error adding message',action.err);
            return state;
        case 'ADD-DETAIL':
            console.log('added detail', action.message);
            return state;
        case 'ADD_DETAIL_ERROR':
            console.log('error adding detail',action.err);
            return state;
        case 'DELETE_MESSAGE':
            console.log('delete event', action.payload);
            return state;
        case 'DELETE_MESSAGE_ERROR':
            console.log('delete event error', action.payload);
            return state;
        default:
            return state;
    }
}

export default messageReducer