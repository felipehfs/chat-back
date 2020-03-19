export function createEvent(type, data, websocket) {
    const event = JSON.parse(JSON.stringify({
        type,
        data
    }));
    console.log('sending event: ', event);
    websocket.send(JSON.stringify(event));
}

export const handleUserOnlineEvent = ({ payload, user}, websocket) => {
        if (payload.data.id !== user.id) {
            const data = {
                id: user.id,
                name: user.username,
                avatarURL: user.avatar_url
            }

            createEvent('user_online_received', data, websocket);
        }
}