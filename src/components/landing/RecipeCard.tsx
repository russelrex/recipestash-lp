import React from 'react';
import styles from './RecipeCard.module.css';

export interface UserRecipe {
  id: number;
  name: string;
  image: string;
}

export interface RecipeCardProps {
  userName: string;
  userBio: string;
  profileImage: string;
  recipes: UserRecipe[];
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  userName,
  userBio,
  profileImage,
  recipes,
}) => {
  const [firstRecipe, secondRecipe, thirdRecipe] = recipes;

  return (
    <article className={styles.card}>
      {/* USER PROFILE SECTION - 3 Columns: Profile Pic | Details | Third Recipe */}
      <div className={styles.userProfile}>
        {/* LEFT - Profile Picture Column */}
        <div className={styles.profilePicColumn}>
          <img
            src={profileImage}
            alt={`${userName} profile`}
            className={styles.profilePic}
          />
        </div>

        {/* MIDDLE - User Details Column */}
        <div className={styles.userDetailsColumn}>
          <h2 className={styles.userName}>{userName}</h2>
          <p className={styles.userBio}>{userBio}</p>
        </div>

        {/* RIGHT - Third Recipe */}
        {thirdRecipe && (
          <div className={styles.thirdRecipeColumn}>
            <div className={styles.recipeCard}>
              <img
                src={thirdRecipe.image}
                alt={thirdRecipe.name}
                className={styles.recipeImage}
              />
              <p className={styles.recipeName}>{thirdRecipe.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* RECIPES LIST BELOW USER PROFILE - First 2 Recipes */}
      <div className={styles.recipesSection}>
        <h3 className={styles.recipesTitle}>Recipes</h3>
        <div className={styles.recipesGrid}>
          {firstRecipe && (
            <div className={styles.recipeCard}>
              <img
                src={firstRecipe.image}
                alt={firstRecipe.name}
                className={styles.recipeImage}
              />
              <p className={styles.recipeName}>{firstRecipe.name}</p>
            </div>
          )}
          {secondRecipe && (
            <div className={styles.recipeCard}>
              <img
                src={secondRecipe.image}
                alt={secondRecipe.name}
                className={styles.recipeImage}
              />
              <p className={styles.recipeName}>{secondRecipe.name}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
