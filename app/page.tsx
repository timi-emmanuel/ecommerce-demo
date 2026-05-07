import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/features/products/data/getProducts";

export default async function Home() {
  const { products } = await getProducts();
  return (
    <div className="w-full">
      <section className="relative w-full bg-[#F2F0F1]">
        <div className="mx-auto max-w-[1440px]">
          {/* Main Hero Content */}
          <div className="grid min-h-[663px] items-center gap-8 lg:grid-cols-2 lg:gap-0">
            {/* Left Content */}
            <div className="px-6 pt-10 pb-6 sm:px-12 lg:px-16 lg:pt-20 lg:pb-16">
              <h1 className="max-w-[577px] text-[36px] font-black uppercase leading-[1.1] tracking-tight sm:text-[48px] lg:text-[64px]">
                Find clothes that matches your style
              </h1>
              
              <p className="mt-5 max-w-[545px] text-[14px] font-normal leading-[1.6] text-black/60 sm:text-[16px] lg:mt-8">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality.
              </p>
              
              <div className="pt-6 lg:pt-8">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="h-[52px] rounded-full px-[54px] text-[16px] font-medium"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Stats Section - Desktop Only in Left Column */}
              <div className="mt-6 hidden lg:flex lg:items-center lg:gap-8 lg:mt-auto lg:pt-20">
                <div>
                  <p className="text-[40px] font-bold leading-[1.1] text-black">
                    200+
                  </p>
                  <p className="mt-2 text-[16px] font-normal leading-[1.4] text-black/60">
                    International Brands
                  </p>
                </div>

                <div className="h-[52px] w-[1px] bg-black/10" />

                <div>
                  <p className="text-[40px] font-bold leading-[1.1] text-black">
                    2,000+
                  </p>
                  <p className="mt-2 text-[16px] font-normal leading-[1.4] text-black/60">
                    High-Quality Products
                  </p>
                </div>

                <div className="h-[52px] w-[1px] bg-black/10" />

                <div>
                  <p className="text-[40px] font-bold leading-[1.1] text-black">
                    30,000+
                  </p>
                  <p className="mt-2 text-[16px] font-normal leading-[1.4] text-black/60">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[448px] w-full sm:h-[528px] lg:h-[663px]">
              <Image
                src="/Hero-Image.jpg"
                alt="Fashion hero"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Optional: Star decorations if you want them */}
              <div className="absolute right-[50px] top-[100px] hidden lg:block">
                {/* Add star SVG here if needed */}
              </div>
              <div className="absolute left-[30px] top-[200px] hidden lg:block">
                {/* Add star SVG here if needed */}
              </div>
            </div>
          </div>

          {/* Stats Section - Mobile/Tablet Only */}
          <div className="flex items-center justify-center gap-6 border-t border-black/10 bg-[#F2F0F1] px-6 py-10 sm:gap-8 lg:hidden">
            <div className="text-center">
              <p className="text-[24px] font-bold leading-[1.1] text-black sm:text-[32px]">
                200+
              </p>
              <p className="mt-2 text-[12px] font-normal text-black/60 sm:text-[14px]">
                International Brands
              </p>
            </div>

            <div className="h-[52px] w-[1px] bg-black/10" />

            <div className="text-center">
              <p className="text-[24px] font-bold leading-[1.1] text-black sm:text-[32px]">
                2,000+
              </p>
              <p className="mt-2 text-[12px] font-normal text-black/60 sm:text-[14px]">
                High-Quality Products
              </p>
            </div>

            <div className="h-12 w-[1px] bg-black/10" />

            <div className="text-center">
              <p className="text-[24px] font-bold leading-[1.1] text-black sm:text-[32px]">
                30,000+
              </p>
              <p className="mt-2 text-[12px] font-normal text-black/60 sm:text-[14px]">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}