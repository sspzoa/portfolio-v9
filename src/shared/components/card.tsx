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
    <article className="group flex w-full flex-col gap-spacing-400 md:flex-row">
      {image && (
        <div className="relative aspect-video w-full shrink-0 self-start overflow-hidden rounded-radius-400 ring-1 ring-line-outline md:w-96">
          <Image
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            src={image}
            width={382}
            height={214}
            alt={mainText}
            draggable={false}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-spacing-300">
        <div className="flex flex-row items-center gap-spacing-300">
          {icon && (
            <Image
              className="h-9 w-9 shrink-0 rounded-radius-200 object-contain"
              width={36}
              height={36}
              alt=""
              src={icon}
              draggable={false}
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-semibold text-body text-content-standard-primary leading-snug">{mainText}</h3>
            <p className="text-content-standard-tertiary text-footnote">{subText}</p>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-row flex-wrap gap-spacing-150">
            {tags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
        )}
        {description && <Description maxHeight={300}>{description}</Description>}
      </div>
    </article>
  );
}
