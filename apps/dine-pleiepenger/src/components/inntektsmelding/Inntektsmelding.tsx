import { Inntektsmelding } from '../../server/api-models/InntektsmeldingSchema';

interface Props {
    inntektsmelding: Inntektsmelding;
}

const InntektsmeldingDetaljer = ({ inntektsmelding }: Props) => {
    return (
        <>
            <h2>Detaljer for inntektsmelding</h2>
            <pre>{JSON.stringify(inntektsmelding, null, 2)}</pre>
        </>
    );
};

export default InntektsmeldingDetaljer;
