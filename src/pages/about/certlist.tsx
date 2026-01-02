import React, { useState } from 'react';
import { certificates } from '../../data/certificates';
import { formatDate } from '../../utils';

export default function CertList() {
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <section id="certificates">
      <div
        className="row"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: '20px',
        }}
      >
        {certificates.slice(0, visibleCount).map((cert, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              margin: '10px',
              width: 'calc(50% - 20px)',
              textAlign: 'center',
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-color)',
              padding: '10px',
            }}
          >
            <img
              src={cert.image}
              alt={cert.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <h4>{cert.title}</h4>
            <p>{formatDate(cert.date)}</p>
          </div>
        ))}
      </div>
      {visibleCount < certificates.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleLoadMore}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              border: '1px solid #0070f3',
              borderRadius: '5px',
              backgroundColor: 'transparent',
              color: '#0070f3',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
