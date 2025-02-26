"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { addToast } from "@heroui/react";

interface imageUploadProps {
  image: File | null;
  setImage: (image: File | null) => void;
  setCaption: (caption: string) => void;
  setSummary: (summary: string) => void;
  setLoading: (loading: boolean) => void;
  uploaded: boolean;
  setUploaded: (uploaded: boolean) => void;
}

export function ImageUpload({
  image,
  setImage,
  setCaption,
  setSummary,
  setLoading,
  uploaded,
  setUploaded,
}: imageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (uploaded) {
      setUploaded(false);
      setImage(null);
      setCaption("");
      setSummary("");
    }

    setLoading(true);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      const formData = new FormData();
      formData.append("photo", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload_image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await response.json();
        console.log("File uploaded successfully! ");
        setCaption(data.caption);
        setSummary(data.summary);
        setUploaded(true);
        setLoading(false);
      } catch (error: undefined | unknown) {
        setLoading(false);
        setImage(null);
        addToast({
          title: "Image Upload Error",
          description: (error as Error).message,
          color: "danger",
          timeout: 6000,
          shouldShowTimeoutProgess: true,
        });
      }
    }
  };

  return (
    <>
      {isMounted && (
        <div className="flex flex-col space-y-4 items-center cursor-pointer">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div
              className={`${
                uploaded ? `w-24 sm:w-[20em] md:w-[38em] h-20` : `w-24 h-24`
              } bg-secondary hover:bg-blue-300 rounded-3xl flex items-center justify-center transition-colors duration-200`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload className="w-8 h-8 text-secondary-foreground" />
                {uploaded && <p className="text-3xl">Reupload</p>}
              </div>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {image && (
            <p className="text-sm text-muted-foreground">
              Uploaded: {image.name}
            </p>
          )}
        </div>
      )}
    </>
  );
}
