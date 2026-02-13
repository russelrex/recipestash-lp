import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    title: 'Save & Organize',
    description: 'Keep all your favorite recipes in one place. Create collections and never lose a recipe again.',
    icon: '📚',
  },
  {
    title: 'Discover New Recipes',
    description: 'Explore recipes from home cooks around the world. Find inspiration for every meal.',
    icon: '🔍',
  },
  {
    title: 'Share with Community',
    description: 'Share your own creations and connect with others who love cooking as much as you do.',
    icon: '👥',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="features-heading"
    >
      <div className={styles.container}>
        <h2 id="features-heading" className={styles.heading}>
          Why RecipeStash?
        </h2>
        <p className={styles.lead}>
          Everything you need to cook with confidence and share with joy.
        </p>
        <ul className={styles.grid}>
          {FEATURES.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <span className={styles.icon} aria-hidden>
                {feature.icon}
              </span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
