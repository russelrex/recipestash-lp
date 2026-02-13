import { useState, useEffect } from 'react';
import { RecipeCard } from './RecipeCard';
import styles from './RecipeCarousel.module.css';
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
import spagImage from '../../assets/images/spag.jpg';

interface UserRecipe {
  id: number;
  name: string;
  image: string;
}

interface User {
  id: number;
  userName: string;
  userBio: string;
  profileImage: string;
  recipes: UserRecipe[];
}

const mockUsers: User[] = [
  {
    id: 1,
    userName: 'Sarah Chen',
    userBio: 'Passionate home cook specializing in Asian fusion cuisine. Love experimenting with traditional recipes and modern twists.',
    profileImage: userPlaceholder,
    recipes: [
      { id: 1, name: 'Classic Spaghetti Bolognese', image: spagImage },
      { id: 2, name: 'Creamy Carbonara', image: spagImage },
      { id: 3, name: 'Spicy Arrabbiata', image: spagImage },
    ],
  },
  {
    id: 2,
    userName: 'Marcus Johnson',
    userBio: 'BBQ enthusiast and comfort food lover. Sharing family recipes passed down through generations.',
    profileImage: userPlaceholder,
    recipes: [
      { id: 1, name: 'Homemade Meat Sauce Pasta', image: spagImage },
      { id: 2, name: 'Garlic Parmesan Spaghetti', image: spagImage },
      { id: 3, name: 'Italian Style Spaghetti', image: spagImage },
    ],
  },
  {
    id: 3,
    userName: 'Emma Rodriguez',
    userBio: 'Vegetarian chef exploring plant-based alternatives. Making healthy eating delicious and accessible.',
    profileImage: userPlaceholder,
    recipes: [
      { id: 1, name: 'Vegetarian Spaghetti', image: spagImage },
      { id: 2, name: 'Mushroom Pasta', image: spagImage },
      { id: 3, name: 'Tomato Basil Spaghetti', image: spagImage },
    ],
  },
  {
    id: 4,
    userName: 'David Kim',
    userBio: 'Food photographer and recipe developer. Creating visually stunning dishes that taste even better than they look.',
    profileImage: userPlaceholder,
    recipes: [
      { id: 1, name: 'Traditional Spaghetti', image: spagImage },
      { id: 2, name: 'Seafood Spaghetti', image: spagImage },
      { id: 3, name: 'Pesto Spaghetti', image: spagImage },
    ],
  },
  {
    id: 5,
    userName: 'Lisa Thompson',
    userBio: 'Baking and pasta enthusiast. Love making everything from scratch and sharing tips with the community.',
    profileImage: userPlaceholder,
    recipes: [
      { id: 1, name: 'Fresh Pasta with Meatballs', image: spagImage },
      { id: 2, name: 'Spaghetti Aglio e Olio', image: spagImage },
      { id: 3, name: 'Cacio e Pepe Spaghetti', image: spagImage },
    ],
  },
];

export const RecipeCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockUsers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);

  const goPrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + mockUsers.length) % mockUsers.length
    );

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % mockUsers.length);

  return (
    <div className={styles.carouselWrapper} aria-label="Featured users carousel">
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mockUsers.map((user) => (
            <div 
              key={user.id} 
              className={styles.carouselSlide}
            >
              <RecipeCard
                userName={user.userName}
                userBio={user.userBio}
                profileImage={user.profileImage}
                recipes={user.recipes}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={goPrev}
          aria-label="Previous user"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className={styles.dotIndicators} role="tablist" aria-label="User slides">
          {mockUsers.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to user ${index + 1}`}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={goNext}
          aria-label="Next user"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
