import { useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function ImageUploader({
  onImageSelected,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleFile(file: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
    onImageSelected(file);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  function removeImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setError("");
    onImageSelected(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="form-group">
      <label className="form-label">
        Skin image
      </label>

      {!preview ? (
        <>
          <div
            className="upload-zone"
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div className="upload-icon">
              +
            </div>

            <p className="upload-title">
              Upload a skin image
            </p>

            <p className="upload-description">
              Drag & drop your image here or click to browse
            </p>

            <p className="upload-hint">
              JPG, PNG or WebP · Max 5 MB
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              hidden
            />
          </div>
        </>
      ) : (
        <div className="image-preview-container">
          <img
            src={preview}
            alt="Selected skin"
            className="image-preview"
          />

          <div className="image-preview-footer">
            <span>Image selected</span>

            <button
              type="button"
              className="remove-image-button"
              onClick={removeImage}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="upload-error">
          {error}
        </p>
      )}
    </div>
  );
}