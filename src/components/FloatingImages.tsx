import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingImage {
  id: string;
  src: string;
  alt: string;
  row: number;
  size: number;
  duration: number;
  delay: number;
}

// Displays large, more visible images from /public/images/new
// Animates them from left-to-right in a continuous, staggered carousel
export default function FloatingImages() {
  const [images, setImages] = useState<FloatingImage[]>([]);

  useEffect(() => {
    // Use only the new images provided by the user
    const imageFiles = [
      '9349641.png',
      '9352797.png',
      '9353363.png',
      '9353479.png',
      '9353305.png',
      '9349726.png'
    ];

    // Create three rows for better vertical separation
    const rows = 3;
    // Fewer duplicates to reduce density
    const variantsPerFile = 1;
    const floatingImages: FloatingImage[] = imageFiles.flatMap((file, idx) => {
      return Array.from({ length: variantsPerFile }).map((_, vIdx) => ({
        id: `floating-${idx}-${vIdx}`,
        src: `/images/new/${file}`,
        alt: file,
        row: (idx + vIdx) % rows,
        size: 260 + Math.floor(Math.random() * 160), // 260px - 420px (bigger)
        duration: 34 + Math.random() * 18, // slower for calmer movement
        delay: 1 + idx * 1.2 + Math.random() * 1.5 // larger stagger between images
      }));
    });

    setImages(floatingImages);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          className="absolute opacity-70 hover:opacity-90 transition-opacity duration-300"
          style={{
            top: image.row === 0 ? '18%' : image.row === 1 ? '50%' : '82%',
            left: '-30vw',
            width: `${image.size}px`,
            height: `${image.size}px`
          }}
          animate={{
            x: ['-30vw', '130vw']
          }}
          transition={{
            duration: image.duration,
            delay: image.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          whileHover={{ scale: 1.06 }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}