import { useRef, useState } from "react";
import {
  ImagePlus,
  UploadCloud,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
}

export function ImageUploader({
  onImageSelected,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
    type: string;
    resolution: string;
  } | null>(null);

  function handleFile(file: File) {
    onImageSelected(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const img = new Image();

    img.onload = () => {
      setFileInfo({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type,
        resolution: `${img.width} × ${img.height}`,
      });
    };

    img.src = imageUrl;
  }

  function removeImage() {
    setPreview(null);
    setFileInfo(null);
    onImageSelected(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          const file = e.dataTransfer.files[0];

          if (file) handleFile(file);
        }}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center transition hover:border-blue-500 hover:bg-blue-100"
      >
        <UploadCloud className="mx-auto mb-4 h-10 w-10 text-blue-600" />

        <h3 className="font-semibold text-slate-800">
          Drag & Drop your skin image here
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse JPG, PNG or WebP files.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) handleFile(file);
          }}
        />
      </div>

      {preview && fileInfo && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={preview}
            alt="Skin preview"
            className="h-72 w-full object-cover"
          />

          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />

              <span className="font-medium">
                Image Ready for Analysis
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Filename" value={fileInfo.name} />
              <Info label="Size" value={fileInfo.size} />
              <Info label="Format" value={fileInfo.type} />
              <Info label="Resolution" value={fileInfo.resolution} />
            </div>

            <button
              onClick={removeImage}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
              Remove Image
            </button>
          </div>
        </div>
      )}

      {!preview && (
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-600">
            <ImagePlus size={18} />
            <span className="font-medium">
              AI Upload Tips
            </span>
          </div>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-500 text-sm">
            <li>Use natural lighting.</li>
            <li>Keep only one affected skin area in frame.</li>
            <li>Avoid blurry or dark photos.</li>
            <li>Do not use filters.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-slate-500 text-xs uppercase tracking-wide">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}