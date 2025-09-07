import React from 'react';
import './style.css';
import img1 from '../../assets/gallery/1.jpg';
import img2 from '../../assets/gallery/2.jpg';
import img3 from '../../assets/gallery/3.jpg';
import img4 from '../../assets/gallery/4.jpg';
import img5 from '../../assets/gallery/5.jpg';

const Gallery = () => {
  const images = [
    { src: img1, alt: 'Gallery Image 1' },
    { src: img2, alt: 'Gallery Image 2' },
    { src: img3, alt: 'Gallery Image 3' },
    { src: img4, alt: 'Gallery Image 4' },
    { src: img5, alt: 'Gallery Image 5' },
  ];

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      <p>Explore our collection of images and memories.</p>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
