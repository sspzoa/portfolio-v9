import Image from "next/image";

interface TagProps {
  icon?: string;
  name: string;
  isMain?: boolean;
}

export default function Tag({ icon, name, isMain = false }: TagProps) {
  return (
    <div
      className={`flex flex-row items-center justify-center gap-spacing-200 rounded-radius-full border px-spacing-300 py-spacing-100 ${isMain ? "border-core-accent bg-core-accent-translucent" : "border-line-outline"}
      `}>
      {icon && (
        <Image className="h-4 w-4 object-contain" width={16} height={16} src={icon} alt={name} draggable={false} />
      )}
      <p className="text-footnote">{name}</p>
    </div>
  );
}
