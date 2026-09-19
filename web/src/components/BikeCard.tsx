import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge, Heart, MapPin } from "lucide-react";
import type { Bike } from "@/lib/data";
import { formatCurrency, formatKm } from "@/lib/format";
import { cn } from "@/lib/cn";

export function BikeCard({ bike, className }: { bike: Bike; className?: string }) {
  return (
    <Link
      href={`/motos/${bike.slug}`}
      className={cn(
        "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:scale-[1.02] hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={bike.images[0]}
          alt={`${bike.brand} ${bike.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {bike.status === "sold" && (
          <span className="absolute left-2 top-2 rounded bg-error px-2 py-1 text-xs font-semibold text-white">
            Vendida
          </span>
        )}
        {bike.status === "paused" && (
          <span className="absolute left-2 top-2 rounded bg-warning px-2 py-1 text-xs font-semibold text-white">
            Pausada
          </span>
        )}
        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700">
          <Heart className="h-4 w-4" />
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
          📷 {bike.images.length}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(bike.price)}</p>
          {bike.negotiable && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              Negociável
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {bike.brand} {bike.model}
        </h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {bike.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-4 w-4" /> {formatKm(bike.mileage)}
          </span>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full border border-gray-300 px-2 py-0.5">{bike.transmission}</span>
          <span className="rounded-full border border-gray-300 px-2 py-0.5">{bike.fuelType}</span>
        </div>
        <p className="flex items-center gap-1 border-t border-gray-100 pt-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          {bike.city}, {bike.state}
        </p>
      </div>
    </Link>
  );
}
