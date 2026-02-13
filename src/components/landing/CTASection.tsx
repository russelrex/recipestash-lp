import { useNavigate } from 'react-router-dom';
import styles from './CTASection.module.css';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="cta-heading"
    >
      <div className={styles.container}>
        <h2 id="cta-heading" className={styles.heading}>
          Ready to start cooking?
        </h2>
        <p className={styles.lead}>
          Join thousands of home cooks sharing their favorite recipes.
        </p>
        <button
          type="button"
          className={styles.cta}
          onClick={() => navigate('/home')}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
