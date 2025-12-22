import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "default" | "light";
};

export default function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 md:w-14 md:h-14 shrink-0">
        <Image
          src="/images/Logo.png"
          alt="Invoice Generator"
          width={56}
          height={56}
          priority
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className={`font-logo text-base md:text-xl font-bold ${
          isLight ? "text-white" : "text-orange-500"
        }`}
      >
        Invoice Gen
      </span>
    </Link>
  );
}
