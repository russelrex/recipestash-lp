import lpBg01 from '../../assets/images/lp-bg01.png';
import lpBg02 from '../../assets/images/lp-bg02.png';
import lpBgSmall from '../../assets/images/lp-bg-small.jpg';
import { RecipeCarousel } from './RecipeCarousel';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => (
  <div className={styles.heroContainer}>
    {/* Single combined image for small breakpoints */}
    <img
      src={lpBgSmall}
      alt=""
      className={styles.smallBreakpointImage}
    />
    {/* Two-layer hero for larger breakpoints */}
    <img
      src={lpBg01}
      alt=""
      className={styles.backgroundImage}
    />
    <div className={styles.carouselWrapper}>
      <RecipeCarousel />
    </div>
    <img
      src={lpBg02}
      alt=""
      className={styles.foregroundImage}
    />
  </div>
);
