
import Banner from '../Banner/Banner';
import Process from '../Process/Process';
import ClientReview from '../Review/CllientReview';
import NewsSection from '../News/NewsSection';
import CareerMarquee from '../CareerMarquee/CareerMarquee';
import FrequentlyAskedQuestions from '../../FrequentlyAskedQuestions/FrequentlyAskedQuestions';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Process></Process>
           <CareerMarquee></CareerMarquee>
           <NewsSection></NewsSection>
           <ClientReview></ClientReview>
           <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
        </div>
    );
};

export default Home;