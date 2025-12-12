import Image from "next/image";
import { Description } from "@/shared/components/description";

interface CardProps {
  image?: string;
  icon?: string;
  mainText: string;
  subText: string;
  description?: string;
}

export default function Card({ icon, mainText, subText, description }: CardProps) {
  return (
    <div className="flex flex-col gap-spacing-200">
      <div
        className={`flex flex-row items-center gap-spacing-400 ${description ? "rounded-radius-400 bg-components-fill-standard-tertiary p-spacing-400" : ""}`}>
        {" "}
        {icon && <Image draggable={false} alt={mainText} src={icon} width={32} height={32} />}
        <div className="flex flex-col">
          <h3 className="font-semibold text-body">{mainText}</h3>
          <p className="text-content-standard-secondary text-label">{subText}</p>
        </div>
      </div>
      {description && <Description>{description}</Description>}
    </div>
  );
}
