import DOMPurify from 'dompurify';

interface Props {
    text?: string;
    spacing?: boolean;
}

const TextareaSvar = ({ text, spacing = true }: Props) => {
    if (text && text.trim().length > 0) {
        const cleanedText = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
        return (
            <div style={spacing ? { marginTop: '0.5rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' } : undefined}>
                {cleanedText}
            </div>
        );
    }
    return null;
};

export default TextareaSvar;
