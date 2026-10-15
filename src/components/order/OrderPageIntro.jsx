export default function OrderPageIntro({ t }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.pageTitle}</h1>
      <p className="intro-description">{t.introDescription}</p>
      <p className="demo-notice">{t.demoNotice}</p>
    </section>
  );
}
