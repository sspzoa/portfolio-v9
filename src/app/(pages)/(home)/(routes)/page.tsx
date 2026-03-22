"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-spacing-800 overflow-hidden bg-background-standard-primary">
        <div className="relative z-10 flex flex-col items-center gap-spacing-800">
          <div className="flex font-semibold text-display">Seungpyo Suh</div>

          <span className="text-center text-body">
            Mobile & Frontend Engineer
            <br />
            Dongguk University Business '26
            <br />
            Korea Digital Media High School HD 22nd
          </span>

          <div className="relative">
            <Button onClick={() => router.push("/portfolio")} text="Explore my portfolio" />
          </div>
        </div>
      </div>
    </div>
  );
}
