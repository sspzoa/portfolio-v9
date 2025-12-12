import { LucideGithub, LucideInstagram, LucideLinkedin, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-spacing-700 p-spacing-400">
      <div className="overflow-hidden rounded-radius-400">
        <Image src="/photo.jpg" alt="Profile Photo" width={140} height={175} className="scale-110" draggable={false} />
      </div>
      <h1 className="font-semibold text-title md:text-display">
        sspzoa <span className="text-content-standard-secondary">Seungpyo Suh</span>
      </h1>
      <div className="flex flex-row gap-spacing-500">
        <Link
          className="duration-100 hover:opacity-50"
          href="https://github.com/sspzoa"
          rel="noopener noreferrer"
          target="_blank">
          <LucideGithub className="text-content-standard-secondary" size={32} />
        </Link>
        <Link
          className="duration-100 hover:opacity-50"
          href="https://linkedin.com/in/seungpyosuh"
          rel="noopener noreferrer"
          target="_blank">
          <LucideLinkedin className="text-content-standard-secondary" size={32} />
        </Link>
        <Link
          className="duration-100 hover:opacity-50"
          href="https://www.instagram.com/seuungpyo"
          rel="noopener noreferrer"
          target="_blank">
          <LucideInstagram className="text-content-standard-secondary" size={32} />
        </Link>
        <Link
          className="duration-100 hover:opacity-50"
          href="mailto:me@sspzoa.io"
          rel="noopener noreferrer"
          target="_blank">
          <LucideMail className="text-content-standard-secondary" size={32} />
        </Link>
      </div>
    </div>
  );
};
