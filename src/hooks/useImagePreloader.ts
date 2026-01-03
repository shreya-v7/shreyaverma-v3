import { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { artists } from '../data/diary/music';
import { cinemaPosts } from '../data/diary/cinema';
import { certificates } from '../data/certificates';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

export const useImagePreloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imagePaths: string[] = [
      // Profile image
      '/profile.png',
      
      // Project images
      ...projects.map(project => `/${project.image}`),
      
      // Artist images
      ...artists
        .filter(artist => artist.image)
        .map(artist => `/${artist.image}`),
      
      // Cinema images
      ...cinemaPosts
        .filter(post => post.image)
        .map(post => `/${post.image}`),
      
      // Certificate images
      ...certificates.map(cert => cert.image),
      
      // Experience logos
      ...experienceData.map(exp => `/${exp.logo}`),
      
      // Education logos
      ...educationData.map(edu => `/${edu.logo}`),
    ];

    let loadedCount = 0;
    const totalImages = imagePaths.length;

    if (totalImages === 0) {
      setLoading(false);
      return;
    }

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = () => {
          // Continue even if image fails to load
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    const preloadAll = async () => {
      const startTime = Date.now();
      const minDisplayTime = 800; // Minimum 800ms display time to avoid flickering
      
      try {
        await Promise.all(imagePaths.map(loadImage));
        
        // Ensure minimum display time
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        
        setTimeout(() => {
          setLoading(false);
        }, remainingTime + 300); // Add 300ms for smooth transition
      } catch (error) {
        console.error('Error preloading images:', error);
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };

    preloadAll();
  }, []);

  return { loading, progress };
};

