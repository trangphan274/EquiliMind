import React, { useState } from "react";
import { BookOpen } from "lucide-react";

function RecoveryNote() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!content.trim()) {
      setMessage("Please write something first.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage("Please log in to save your note.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/reflections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content.trim(),
            tag: "recovery",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save note.");
      }

      setContent("");
      setMessage("Note saved successfully.");
    } catch (error) {
      console.error("Reflection error:", error);
      setMessage("Unable to save your note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="recovery-note-card">
      <div className="recovery-note-header">
        <BookOpen size={21} />

        <h2>Recovery Notes & Journal</h2>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write down how you felt or what may have contributed to your recent burnout assessment..."
        className="recovery-note-input"
      />

      <div className="recovery-note-footer">
        {message && (
          <span className="recovery-note-message">
            {message}
          </span>
        )}

        <button
          type="button"
          className="save-note-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>
    </section>
  );
}

export default RecoveryNote;