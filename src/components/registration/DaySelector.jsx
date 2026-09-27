import { DAYS } from "../../config/plans";
import { EVENT } from "../../config/eventConfig";

export function DaySelector({ selectedDay, onSelect, amount, disabled }) {
  return (
    <fieldset style={{ border: "none", padding: 0, margin: "0 0 1.5rem" }}>
      <span className="day-selector-legend">Choose your event day</span>
      <p className="day-selector-note">
        Your ₹{amount} pass is valid for ONE day only.
      </p>
      <div className="day-options" role="radiogroup" aria-label="Choose your event day">
        {[
          { value: DAYS.DAY_1, label: "Day 1", date: EVENT.day1Date },
          { value: DAYS.DAY_2, label: "Day 2", date: EVENT.day2Date },
        ].map((day) => (
          <label className="day-option" key={day.value}>
            <input
              type="radio"
              name="event-day"
              value={day.value}
              checked={selectedDay === day.value}
              onChange={() => onSelect(day.value)}
              disabled={disabled}
            />
            <span className="day-option-text">
              <strong>{day.label}</strong>
              <span>{day.date}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function BothDaysNotice() {
  return (
    <div className="both-days-note">
      <span className="lead">Your pass includes:</span>
      <div className="both-day-chip">
        ✓ Day 1 ({EVENT.day1Date}) + Day 2 ({EVENT.day2Date})
      </div>
    </div>
  );
}
