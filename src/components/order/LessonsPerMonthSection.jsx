import { formatNumber } from "../../utils/formatters";

export default function LessonsPerMonthSection({
  language,
  t,
  monthlyLessonOptions,
  selectedMonthlyLessons,
  setSelectedMonthlyLessons,
  setFormMessage,
}) {
  return (
    <section className="form-card">
      <div className="section-heading">
        <span className="section-number">04</span>
        <div>
          <h2>{t.frequencyTitle}</h2>
          <p>{t.frequencyDescription}</p>
        </div>
      </div>

      <div className="frequency-options">
        {monthlyLessonOptions.map((count) => (
          <label
            key={count}
            className={`frequency-card ${selectedMonthlyLessons === count ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="monthlyLessons"
              value={count}
              checked={selectedMonthlyLessons === count}
              onChange={() => {
                setSelectedMonthlyLessons(count);
                setFormMessage(null);
              }}
            />
            <span className="frequency-count">{formatNumber(count, language)}</span>
            <span className="frequency-label">{t.lessons(count)}</span>
            <span className="frequency-period">{t.perMonth}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
