import type { NextPage } from 'next';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import SvarFrist from '../components/svarfrist/SvarFrist';

const Home: NextPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="flex-grow a-left">
                    <DineSøknader />
                </div>
                <div style={{ minWidth: '15rem', maxWidth: '20rem' }}>
                    <SvarFrist />
                </div>
            </div>
        </div>
    );
};

export default Home;
