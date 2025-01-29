interface Props {
    number: number | string;
}

const NumberCircle = ({ number }: Props) => {
    const size = '1.8rem';
    return (
        <div
            className="rounded-full bg-deepblue-800 flex items-center justify-center"
            style={{ width: size, height: size }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white' }}>{number}</span>
        </div>
    );
};

export default NumberCircle;
