interface Props {
    text?: string;
    spacing?: boolean;
}

const TextareaSvar = ({ text, spacing = true }: Props) => {
    if (text && text.trim().length > 0) {
        return (
            <div
                style={spacing ? { marginTop: '0.5rem', marginBottom: '1rem' } : undefined}
                dangerouslySetInnerHTML={{
                    __html: text.replace(/\n/g, '<br/>').replace(/'/g, "''"),
                }}
            />
        );
    }
    return null;
};

export default TextareaSvar;
