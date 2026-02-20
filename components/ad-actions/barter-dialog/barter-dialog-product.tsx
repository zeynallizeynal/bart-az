import { useState } from "react";
import { FileInput, Input } from "@/components/ui/input";
import UploadBox from "@/components/upload-box";
import { Textarea } from "@/components/ui/textarea";

export default function BarterDialogProduct() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <div className="flex-col flex gap-5">
        <FileInput
          label="Məhsulun şəkilləri"
          onDropAccepted={(files) =>
            setFiles((prevState) => [...prevState, ...files])
          }
        />
        {files.length > 0 && (
          <UploadBox
            files={files}
            onDelete={(index) =>
              setFiles((prevState) => prevState.filter((_, i) => index !== i))
            }
          />
        )}
        <label htmlFor="product-price">
          <span className="leading-6 font-medium text-gray-800 text-base mb-3 inline-block">
            Qiyməti
          </span>
          <Input label="Daxil edin..." id="product-price" />
        </label>
        <Textarea
          placeholder="Elanın haqqında ətraflı məlumat"
          label="Əlavə qeydlər"
          className="h-[120px] resize-none"
        />
      </div>
    </>
  );
}
