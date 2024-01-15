import React from 'react'

const Notification = ({message}) => {
    if (message === null) {
        return null
    } else if (message.kind === 'success') {
        return <div className='notification-success'>{message.content}</div>;
    } else {
        return <div className='notification-error'>{message.content}</div>;
    }
}

export default Notification