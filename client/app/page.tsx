"use client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ImageUpload } from "@/components/image-upload";
import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedLoader from "@/components/loader";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <main className="flex flex-col md:flex-row min-h-screen justify-center items-center w-full p-10 bg-background text-foreground transition-colors duration-200 space-y-6">
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <section className="flex flex-col justify-center w-1/2">
          <div
            className={`flex flex-col justify-center ${
              uploaded ? `items-start` : `items-center`
            } w-full`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-center sm:text-left">
              Photographic Image Summary
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 mb-4 sm:mb-8 text-center sm:text-left">
              Ensure picture is in JPG, PNG, or HIEF format.
            </p>
            <ImageUpload
              image={image}
              setImage={setImage}
              setCaption={setCaption}
              setSummary={setSummary}
              setLoading={setLoading}
              uploaded={uploaded}
              setUploaded={setUploaded}
            />
          </div>
        </section>
        <section
          className={`flex items-center justify-center ${
            uploaded ? `w-1/2` : `w-0`
          }`}
        >
          {loading && <AnimatedLoader />}
          {uploaded && image && (
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded image"
                quality={100}
                width={200}
                height={200}
                loading="lazy"
                className="max-w-full sm:max-w-[80%] md:max-w-[60%]"
                style={{ objectFit: "contain" }}
              />
              <p className="italic text-md w-full mb-2 sm:mb-4 text-muted-foreground text-center">
                {caption}
              </p>
              <p className="text-secondary-foreground w-full text-lg text-center">
                {summary}
              </p>
            </div>
          )}
        </section>
      </main>
    )
  );
}
