interface Props {
    tekst?: string;
}

const FormatertFritekst = ({ tekst }: Props) => {
    if (tekst && tekst.trim().length > 0) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: tekst.replace(/\n/g, '<br/>').replace(/'/g, "''"),
                }}
            />
        );
    }
    return null;
};

export default FormatertFritekst;
