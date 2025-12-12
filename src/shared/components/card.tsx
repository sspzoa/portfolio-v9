import Image from "next/image";
import { Description } from "@/shared/components/description";
import Tag from "@/shared/components/tag";

interface CardProps {
  image?: string;
  icon?: string;
  mainText: string;
  subText: string;
  tags?: string[];
  description?: string;
}

export default function Card({ image, icon, mainText, subText, tags, description }: CardProps) {
  return (
    <div className="flex w-full flex-col gap-spacing-400 md:flex-row">
      {image && (
        <Image
          className="aspect-video w-full rounded-radius-200 border border-line-outline object-cover md:h-54 md:w-96"
          src={image}
          width={382}
          height={214}
          alt={mainText}
          draggable={false}
        />
      )}
      <div className="flex w-full flex-col gap-spacing-400">
        <div
          className={`flex flex-row items-center gap-spacing-400 ${description || tags ? "rounded-radius-400 bg-components-fill-standard-tertiary p-spacing-400" : ""}`}>
          {icon && (
            <Image
              className="h-8 w-8 rounded-radius-200 object-contain"
              width={32}
              height={32}
              alt={mainText}
              src={icon}
              draggable={false}
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-body">{mainText}</h3>
            <p className="text-content-standard-secondary text-footnote">{subText}</p>
          </div>
        </div>
        {tags && (
          <div className="flex flex-row flex-wrap gap-spacing-200">
            {tags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
        )}
        {description && <Description>{description}</Description>}
      </div>
    </div>
  );
}
