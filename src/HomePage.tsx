import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero" id="hero">
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <p className="home-kicker">Welcome to RecipeStash</p>
            <h1>All your favorite recipes, beautifully stashed in one place.</h1>
            <p className="home-subtitle">
              Save family treasures, discover new weeknight heroes, and share your best dishes with
              the people you love.
            </p>
            <div className="home-hero-actions">
              <a href="#services" className="home-primary-cta">
                Explore what you can do
              </a>
              <a href="#download" className="home-secondary-cta">
                Get the app
              </a>
            </div>
          </div>

          <div className="home-hero-visual" aria-hidden="true">
            <div className="home-hero-card-shadow" />
            <div className="home-hero-card">
              <div className="home-hero-card-header">
                <span className="home-hero-camera">📷</span>
              </div>
              <div className="home-hero-card-image">
                <span className="home-hero-egg">🍳</span>
                <span className="home-hero-star">⭐</span>
              </div>
              <div className="home-hero-card-body">
                <div className="home-hero-card-title" />
                <div className="home-hero-card-meta">
                  <span className="home-hero-heart">❤️</span>
                  <span className="home-hero-tag" />
                  <span className="home-hero-tag" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-section" id="services">
        <div className="home-section-header">
          <h2>What RecipeStash does for you</h2>
          <p>
            Designed for home cooks, food bloggers, and families who never want to lose a great
            recipe again.
          </p>
        </div>
        <div className="home-services-grid">
          <article className="home-service-card">
            <h3>Save &amp; organize</h3>
            <p>
              Capture recipes from anywhere—photos, websites, or handwritten cards—and keep them
              perfectly organized with tags and collections.
            </p>
          </article>
          <article className="home-service-card">
            <h3>Share with your people</h3>
            <p>
              Share a single dish or an entire collection with friends, family, or your cooking
              community in just a few taps.
            </p>
          </article>
          <article className="home-service-card">
            <h3>Cook with confidence</h3>
            <p>
              Step-by-step cooking mode, smart timers, and clear ingredient lists help you stay
              focused and in the flow.
            </p>
          </article>
        </div>
      </section>

      {/* How it works Section */}
      <section className="home-section" id="how-it-works">
        <div className="home-section-header">
          <h2>How RecipeStash fits into your cooking flow</h2>
          <p>
            From the moment inspiration strikes to the final plated dish, RecipeStash keeps every
            step tidy and easy to revisit.
          </p>
        </div>
        <ol className="home-steps">
          <li className="home-step-card">
            <span className="home-step-index">1</span>
            <div>
              <h3>Capture the recipe</h3>
              <p>
                Snap a photo, paste a link, or type it in. Add quick tags like “weeknight”, “vegan”,
                or “family favorite” so you can find it in seconds.
              </p>
            </div>
          </li>
          <li className="home-step-card">
            <span className="home-step-index">2</span>
            <div>
              <h3>Stash it into a collection</h3>
              <p>
                Group recipes into collections like “Sunday Suppers”, “Lunchbox Ideas”, or
                “Holiday Baking” that feel like curated cookbooks.
              </p>
            </div>
          </li>
          <li className="home-step-card">
            <span className="home-step-index">3</span>
            <div>
              <h3>Cook &amp; share</h3>
              <p>
                Cook with step-by-step mode, then share the finished recipe—or your entire
                collection—with friends, family, or your community.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="home-section home-testimonials" id="testimonials">
        <div className="home-section-header">
          <h2>Cooks who already stash with us</h2>
          <p>RecipeStash is built for real kitchens, busy weeknights, and treasured family meals.</p>
        </div>
        <div className="home-testimonial-grid">
          <article className="home-testimonial-card">
            <p className="home-quote">
              “I finally moved my grandmother&apos;s recipes out of an old shoebox. Now my siblings
              and I can all cook them, wherever we are.”
            </p>
            <p className="home-quote-author">— Lena, family cook &amp; keeper-of-the-recipes</p>
          </article>
          <article className="home-testimonial-card">
            <p className="home-quote">
              “RecipeStash turned my scattered screenshots and saved tabs into a calm little
              library. Planning dinners is actually fun again.”
            </p>
            <p className="home-quote-author">— Marco, weeknight pasta enthusiast</p>
          </article>
          <article className="home-testimonial-card">
            <p className="home-quote">
              “I share collections with my newsletter subscribers and they love having everything in
              one place instead of chasing links.”
            </p>
            <p className="home-quote-author">— Priya, food blogger</p>
          </article>
        </div>
      </section>

      {/* Download Section */}
      <section className="home-section home-download" id="download">
        <div className="home-download-inner">
          <div className="home-download-copy">
            <h2>Bring RecipeStash into your kitchen</h2>
            <p>
              Available on Android (and coming soon to more platforms), so your recipes are always
              within reach—on the counter, on the sofa, or at the store.
            </p>
          </div>
          <div className="home-download-badges">
            <a
              href="https://play.google.com/store/apps/details?id=com.recipestash.app"
              target="_blank"
              rel="noopener noreferrer"
              className="home-store-badge android"
            >
              <span className="store-label">Download on</span>
              <span className="store-name">Google Play</span>
            </a>
            <a
              href="#"
              className="home-store-badge coming-soon"
            >
              <span className="store-label">Coming soon</span>
              <span className="store-name">iOS App Store</span>
            </a>
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="home-footer" id="signin">
        <p>Ready to stash your first recipe?</p>
        <a href="#" className="home-footer-link">
          Sign in or create an account
        </a>
      </footer>
    </div>
  );
}

export default HomePage;

