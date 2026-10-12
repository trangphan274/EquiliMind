import React, { useEffect, useState } from "react";
import { LockKeyhole, Save } from "lucide-react";
import {
  getReflections,
  createReflection,
} from "../../services/reflectionService.js";


function DailyReflection() {
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const tags = ["#Work", "#Sleep", "#Boundaries"];

  // Load reflections when component opens
  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReflections();

      setEntries(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!note.trim()) return;

    try {
      setSaving(true);
      setError("");

      // Save to backend
      await createReflection(note.trim());

      // Clear textarea
      setNote("");

      // Reload latest reflections
      await loadReflections();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
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
          disabled={saving}
        >
          <Save size={17} />
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </div>

      {error && (
        <div className="reflection-error">
          {error}
        </div>
      )}

      <div className="reflection-divider" />

      <div className="reflection-entries">
        {loading ? (
          <div className="reflection-empty">
            Loading reflections...
          </div>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <div className="reflection-entry" key={entry.id}>
              <div className="reflection-entry-top">
                <span className="reflection-entry-time">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>

                {entry.tag && (
                  <span className="reflection-entry-tag">
                    {entry.tag}
                  </span>
                )}
              </div>

              <p>{entry.content}</p>
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