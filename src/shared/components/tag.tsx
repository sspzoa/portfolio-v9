import Image from "next/image";

interface TagProps {
  icon?: string | null;
  name: string;
  isMain?: boolean;
}

// Inline skill token — icon + name, no pill. Main skills read at full contrast.
export default function Tag({ icon, name, isMain = false }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-spacing-150 ${
        isMain ? "font-medium text-content-standard-primary" : "text-content-standard-tertiary"
      }`}>
      {icon && (
        <Image
          className="h-3.5 w-3.5 shrink-0 object-contain"
          width={14}
          height={14}
          src={icon}
          alt=""
          sizes="14px"
          draggable={false}
        />
      )}
      <span className="text-label">{name}</span>
    </span>
  );
}
