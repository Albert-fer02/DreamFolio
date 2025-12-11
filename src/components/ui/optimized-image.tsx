'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ImageProcessor from '../../../lib/wasm/image-processor';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  enableWebAssembly?: boolean;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Optimized Image Component with WebAssembly Processing
 * Provides high-performance image optimization using WebAssembly
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  quality = 85,
  enableWebAssembly = true,
  className,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enableWebAssembly) return;

    const processImage = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        // Load image
        const img = new window.Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        // Draw image to canvas
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const uint8Array = new Uint8Array(imageData.data.buffer);

        // Process with WebAssembly
        const processedData = await ImageProcessor.compressImage(uint8Array, quality / 100);

        // Create new image data
        const processedImageData = new ImageData(
          new Uint8ClampedArray(processedData),
          width,
          height
        );

        // Put processed data back to canvas
        ctx.putImageData(processedImageData, 0, 0);

        // Convert to blob and create object URL
        canvas.toBlob((blob) => {
          if (blob) {
            const processedUrl = URL.createObjectURL(blob);
            setProcessedSrc(processedUrl);
          }
        }, 'image/webp', quality / 100);

      } catch (err) {
        console.error('WebAssembly image processing failed:', err);
        setError('Failed to process image');
        // Fallback to original image
        setProcessedSrc(src);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();

    // Cleanup
    return () => {
      if (processedSrc !== src && processedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(processedSrc);
      }
    };
  }, [src, width, height, quality, enableWebAssembly]);

  return (
    <>
      {/* Hidden canvas for WebAssembly processing */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width={width}
        height={height}
      />

      <Image
        src={processedSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={className}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={() => {
          // Fallback to original src if processed image fails
          if (processedSrc !== src) {
            setProcessedSrc(src);
          }
        }}
      />

      {/* Loading indicator */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error indicator */}
      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 text-center">
          {error}
        </div>
      )}
    </>
  );
};

export default OptimizedImage;