/**
 * WebAssembly Image Processor
 * Provides high-performance image processing capabilities using WebAssembly
 */

// WebAssembly module interface
interface ImageProcessorWasm {
  process_image: (imageData: Uint8Array) => Uint8Array;
  resize_image: (imageData: Uint8Array, width: number, height: number) => Uint8Array;
  compress_image: (imageData: Uint8Array, quality: number) => Uint8Array;
  apply_filter: (imageData: Uint8Array, filterType: number) => Uint8Array;
}

class ImageProcessor {
  private static instance: WebAssembly.Instance | null = null;
  private static isInitialized = false;

  /**
   * Initialize the WebAssembly module
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load WebAssembly module
      const response = await fetch('/wasm/image_processor.wasm');
      const buffer = await response.arrayBuffer();

      const { instance } = await WebAssembly.instantiate(buffer, {
        env: {
          memory: new WebAssembly.Memory({ initial: 256 }),
          abort: () => console.error('WebAssembly abort called'),
        },
      });

      this.instance = instance;
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize WebAssembly image processor:', error);
      throw error;
    }
  }

  /**
   * Process image data using WebAssembly
   */
  static async processImage(imageData: Uint8Array): Promise<Uint8Array> {
    await this.initialize();

    if (!this.instance) {
      throw new Error('WebAssembly instance not initialized');
    }

    try {
      const wasmExports = this.instance.exports as any;
      return wasmExports.process_image(imageData);
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  /**
   * Resize image using WebAssembly
   */
  static async resizeImage(
    imageData: Uint8Array,
    width: number,
    height: number
  ): Promise<Uint8Array> {
    await this.initialize();

    if (!this.instance) {
      throw new Error('WebAssembly instance not initialized');
    }

    try {
      const wasmExports = this.instance.exports as any;
      return wasmExports.resize_image(imageData, width, height);
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  }

  /**
   * Compress image using WebAssembly
   */
  static async compressImage(
    imageData: Uint8Array,
    quality: number = 0.8
  ): Promise<Uint8Array> {
    await this.initialize();

    if (!this.instance) {
      throw new Error('WebAssembly instance not initialized');
    }

    try {
      const wasmExports = this.instance.exports as any;
      return wasmExports.compress_image(imageData, quality * 100);
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  }

  /**
   * Apply filter to image using WebAssembly
   */
  static async applyFilter(
    imageData: Uint8Array,
    filterType: 'blur' | 'sharpen' | 'grayscale' | 'sepia' = 'grayscale'
  ): Promise<Uint8Array> {
    await this.initialize();

    if (!this.instance) {
      throw new Error('WebAssembly instance not initialized');
    }

    const filterMap = {
      blur: 0,
      sharpen: 1,
      grayscale: 2,
      sepia: 3,
    };

    try {
      const wasmExports = this.instance.exports as any;
      return wasmExports.apply_filter(imageData, filterMap[filterType]);
    } catch (error) {
      console.error('Error applying filter:', error);
      throw error;
    }
  }

  /**
   * Batch process multiple images
   */
  static async batchProcess(
    images: Uint8Array[],
    operation: 'resize' | 'compress' | 'filter',
    options?: any
  ): Promise<Uint8Array[]> {
    await this.initialize();

    const results: Uint8Array[] = [];

    for (const image of images) {
      try {
        let result: Uint8Array;

        switch (operation) {
          case 'resize':
            result = await this.resizeImage(image, options.width, options.height);
            break;
          case 'compress':
            result = await this.compressImage(image, options.quality);
            break;
          case 'filter':
            result = await this.applyFilter(image, options.filterType);
            break;
          default:
            result = await this.processImage(image);
        }

        results.push(result);
      } catch (error) {
        console.error('Error in batch processing:', error);
        // Return original image on error
        results.push(image);
      }
    }

    return results;
  }
}

export default ImageProcessor;