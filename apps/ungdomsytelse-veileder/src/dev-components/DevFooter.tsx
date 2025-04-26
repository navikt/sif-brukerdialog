import DevContextBar from './dev-context/DevContetBar';

interface Props {}

const DevFooter = ({}: Props) => {
    return (
        <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
            <DevContextBar />
        </div>
    );
};
export default DevFooter;
