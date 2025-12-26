import React, { forwardRef } from 'react';
import Image from 'next/image';

interface MorphingImageProps {
    currentImage: string;
}

const MorphingImage = forwardRef<HTMLDivElement, MorphingImageProps>(({ currentImage }, ref) => {
    return (
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
            <div
                ref={ref}
                className="relative w-64 h-64 md:w-[500px] md:h-[500px] overflow-hidden shadow-2xl transition-all duration-300 bg-gray-200"
                style={{ borderRadius: '0px 200px 200px 200px' }} // Initial state (Section 1)
            >
                <Image
                    src={currentImage}
                    alt="Section Image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
});

MorphingImage.displayName = 'MorphingImage';

export default MorphingImage;
