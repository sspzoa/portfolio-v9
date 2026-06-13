import Image from "next/image";

interface TagProps {
  icon?: string | null;
  name: string;
  isMain?: boolean;
}

export default function Tag({ icon, name, isMain = false }: TagProps) {
  return (
    <div
      className={`flex flex-row items-center gap-spacing-150 rounded-radius-full px-spacing-300 py-spacing-100 ${
        isMain
          ? "bg-core-accent-translucent text-core-accent ring-1 ring-core-accent/30 ring-inset"
          : "bg-components-translucent-tertiary text-content-standard-secondary"
      }`}>
      {icon && (
        <Image className="h-3.5 w-3.5 object-contain" width={14} height={14} src={icon} alt="" draggable={false} />
      )}
      <p className="font-medium text-footnote">{name}</p>
    </div>
  );
}
