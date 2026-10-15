export default function SiteHeader({ t, onToggleLanguage }) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="logo" href="#main" aria-label={t.brand}>
          <span className="logo-mark">G</span>
          <span>{t.brand}</span>
        </a>
        <div className="header-actions">
          <button
            className="language-button"
            type="button"
            onClick={onToggleLanguage}
            aria-label={t.languageLabel}
          >
            {t.languageButton}
          </button>
          <div className="header-badge">
            <span className="status-dot" />
            {t.headerBadge}
          </div>
        </div>
      </div>
    </header>
  );
}
