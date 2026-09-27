import { SCHEDULE } from "../../config/eventConfig";

function DayColumn({ day }) {
  return (
    <div className="schedule-col">
      <h3>{day.label} · {day.date}</h3>
      <p className="schedule-theme">{day.theme}</p>
      <ul className="schedule-list">
        {day.items.map((item) => (
          <li key={item.time + item.title}>
            <span className="sched-time">{item.time}</span>
            <span className="sched-title">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Schedule() {
  return (
    <section className="section" id="schedule">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">Schedule</span>
          <h2>Two days, planned end to end</h2>
          <p>The same schedule shown here applies whether you hold a 1-day or 2-day pass.</p>
        </div>

        <div className="schedule-cols">
          <DayColumn day={SCHEDULE.day1} />
          <DayColumn day={SCHEDULE.day2} />
        </div>
      </div>
    </section>
  );
}
