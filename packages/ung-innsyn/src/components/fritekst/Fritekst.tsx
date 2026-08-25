import DOMPurify from 'dompurify';

interface Props {
    text?: string;
}

const Fritekst = ({ text }: Props) => {
    if (text && text.trim().length > 0) {
        const cleanedText = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
        return <span style={{ whiteSpace: 'pre-wrap' }}>{cleanedText}</span>;
    }
    return null;
};

export default Fritekst;
