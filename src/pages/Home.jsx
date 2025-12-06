import Hero from '../components/home/Hero';
import ProductGrid from '../components/home/ProductGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Statistics from '../components/home/Statistics';
import Campaigns from '../components/home/Campaigns';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import FAQ from '../components/home/FAQ';

export function Home() {
  return (
    <main>
      <Hero />
      <ProductGrid />
      <WhyChooseUs />
      <Statistics />
      <Campaigns />
      <Testimonials />
      <Partners />
      <FAQ />
    </main>
  );
}

export default Home;

