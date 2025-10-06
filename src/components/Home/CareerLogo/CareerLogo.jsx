
import { Link } from 'react-router';
import careerLogo from '../../../assets/logo.png'

const CareerLogo = () => {
    return (
        <Link to="/">
            <div className='flex justify-center items-center p-2'>
                <img data-aos="fade-up"
                    data-aos-duration="1000"
                    className='mb-4' src={careerLogo} alt="" />
                <p className='text-3xl font-extrabold -ml-2'>Career Flow</p>
            </div>
        </Link>
    );
};

export default CareerLogo;