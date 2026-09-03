'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  productName: string;
  images: string[];
}

const fallbackImages = [
  '/images/fresh-masala-bowl.jpeg',
  '/images/hero-spice-box.png',
  '/images/whole-spices-bowls.jpeg',
];

export default function ProductGallery({ productName, images }: ProductGalleryProps) {
  const gallery = useMemo(
    () => Array.from(new Set([...images.filter(Boolean), ...fallbackImages])).slice(0, 4),
    [images]
  );
  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <div className="grid gap-3 sm:grid-cols-[76px_1fr]">
      {/* content-start keeps the thumbnails stacked tightly at the top instead
          of stretching to fill the height of the main image. */}
      <div className="order-2 grid grid-cols-4 gap-2 sm:order-1 sm:grid-cols-1 sm:content-start">
        {gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square overflow-hidden rounded-lg border bg-[#fff1d0] transition ${
              selectedImage === image ? 'border-[#542315] shadow-md' : 'border-[#e6c990] hover:border-[#b15a2a]'
            }`}
            aria-label={`View ${productName} image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              sizes="76px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative order-1 aspect-square overflow-hidden rounded-lg border border-[#e6c990] bg-[#f5ead7] shadow-xl shadow-amber-950/10 sm:order-2">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
