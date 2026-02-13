import Header from '../components/landing/Header';
import { HeroSection } from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <section id="about" className="landing-about" aria-labelledby="about-heading">
          <div className="landing-about-inner">
            <h2 id="about-heading">Cook. Share. Connect.</h2>
            <p>
              The social recipe app where every meal tells a story. RecipeStash helps you
              discover, save, and share recipes with a community of passionate home cooks.
            </p>
          </div>
        </section>
        <FeaturesSection />
        <CTASection />
      </main>
    </>
  );
}
