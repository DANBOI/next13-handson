import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex_center">
      <Image
        src="/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
}
