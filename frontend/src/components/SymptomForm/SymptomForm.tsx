interface SymptomFormProps {
  symptoms: string;
  onChange: (value: string) => void;
}

export function SymptomForm({
  symptoms,
  onChange,
}: SymptomFormProps) {
  return (
    <div className="form-group">
      <label
        htmlFor="symptoms"
        className="form-label"
      >
        Describe your symptoms
      </label>

      <textarea
        id="symptoms"
        value={symptoms}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Example: I have redness and itching for 3 days..."
      />

      <p className="field-hint">
        Include symptoms, duration, location, and anything
        that may have triggered them.
      </p>
    </div>
  );
}