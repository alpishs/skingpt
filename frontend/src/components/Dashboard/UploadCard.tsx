import { ShieldCheck } from "lucide-react";
import { ImageUploader } from "../ImageUploader/ImageUploader";

interface UploadCardProps {
  onImageSelected: (file: File | null) => void;
}

export function UploadCard({
  onImageSelected,
}: UploadCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Upload Skin Image
          </h2>

          <p className="text-slate-500 text-sm">
            High-quality images improve AI visual observations.
          </p>
        </div>

        <ShieldCheck className="text-green-600" />
      </div>

      <ImageUploader onImageSelected={onImageSelected} />
    </div>
  );
}