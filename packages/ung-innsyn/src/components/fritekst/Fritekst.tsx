import DOMPurify from 'dompurify';

interface Props {
    text?: string;
}

const Fritekst = ({ text }: Props) => {
    if (text && text.trim().length > 0) {
        const cleanedText = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
        return <div style={{ whiteSpace: 'pre-wrap' }}>{cleanedText}</div>;
    }
    return null;
};

export default Fritekst;
