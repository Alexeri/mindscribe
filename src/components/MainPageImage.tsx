"use client";
import Image from "next/image";
import product from "@/assets/product.png";
import productDark from "@/assets/product_dark.png";
import { useTheme } from "next-themes";

export default function MainPageImage() {
  const { theme } = useTheme();

  return (
    <div className="absolute bottom-0 hidden h-1/2 w-[80%] rounded-t-2xl border-x-[10px] border-t-[10px] md:block ">
      <Image
        src={theme === "dark" ? productDark : product}
        alt="product"
        objectFit="cover"
        layout="fill"
        className="rounded-sm object-top"
      />
    </div>
  );
}
