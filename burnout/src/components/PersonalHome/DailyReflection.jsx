import React, { useState } from "react";
import { LockKeyhole, Save } from "lucide-react";


function DailyReflection({ entries = [], onSave }) {
  const [note, setNote] = useState("");

  const tags = ["#Work", "#Sleep", "#Boundaries"];

  const handleSave = async () => {
    if (!note.trim()) return;

    if (onSave) {
      await onSave(note.trim());
    }

    setNote("");
  };

  return (
    <section className="daily-reflection">
      <div className="reflection-header">
        <div className="reflection-title-group">
          <div className="reflection-icon">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h2>Daily Reflection Space</h2>
            <p>
              Expressing your thoughts reduces cognitive overload and stress.
            </p>
          </div>
        </div>

        <span className="reflection-private">
          Private &amp; End-to-End Encrypted
        </span>
      </div>

      <textarea
        className="reflection-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="How are you feeling today? Any specific stressors or wins you'd like to vent or record?"
      />

      <div className="reflection-actions">
        <div className="reflection-tags">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setNote((prev) => `${prev}${prev ? " " : ""}${tag}`)
              }
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="reflection-save"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Entry
        </button>
      </div>

      <div className="reflection-divider" />

      <div className="reflection-entries">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div className="reflection-entry" key={entry.id}>
              <div className="reflection-entry-top">
                <span className="reflection-entry-time">
                  {entry.time}
                </span>

                <span className="reflection-entry-tag">
                  {entry.tag}
                </span>
              </div>

              <p>{entry.note}</p>
            </div>
          ))
        ) : (
          <div className="reflection-empty">
            No reflection entries yet.
          </div>
        )}
      </div>
    </section>
  );
}

export default DailyReflection;