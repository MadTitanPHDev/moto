import Image from "next/image";
import Link from "next/link";
import type { Bike } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

export function BikeCard({ bike, className }: { bike: Bike; className?: string }) {
  return (
    <Link href={`/motos/${bike.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={bike.images[0]}
          alt={`${bike.brand} ${bike.model}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {bike.status === "sold" && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
            Vendida
          </span>
        )}
        {bike.featured && bike.status === "active" && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
            Novidade
          </span>
        )}
      </div>
      <div className="pt-3">
        <h3 className="text-sm font-extrabold text-ink">
          {bike.brand} {bike.model}
        </h3>
        <p className="mt-0.5 text-sm text-gray-700">{formatCurrency(bike.price)}</p>
      </div>
    </Link>
  );
}
