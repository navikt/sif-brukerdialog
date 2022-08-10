import React from 'react';

interface Props {
    text?: string;
}

const TextareaSummary = ({ text }: Props) => {
    if (text && text.trim().length > 0) {
        return (
            <div
                style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
                dangerouslySetInnerHTML={{
                    __html: text.replace(/\n/, '<br/>'),
                }}
            />
        );
    }
    return null;
};

export default TextareaSummary;
