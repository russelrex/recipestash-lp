import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a
          href="#home"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, '#home')}
        >
          RecipeStash
        </a>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={styles.mobileCta}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/home');
              }}
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
