import React from "react";

export default function HomeSelector({ setSelectedHome }) {
  const homes = [
    { id: "home-1", label: "Home 1", image: "/images/home1.jpg" },
    { id: "home-2", label: "Home 2", image: "/images/home2.jpg" },
    { id: "home-3", label: "Home 3", image: "/images/home3.jpg" },
    { id: "home-4", label: "Home 4", image: "/images/home4.jpg" },
    { id: "home-5", label: "Home 5", image: "/images/home4.jpg" } ,
    { id: "home-6", label: "Home 6", image: "/images/home4.jpg" }
  ];

  const containerStyle = {
    textAlign: 'center',
    padding: '20px'
  };

  const logoStyle = {
    width: '250px',
    marginBottom: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    justifyItems: 'center'
  };

  const buttonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s'
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const buttonHoverStyle = {
    transform: 'scale(1.05)'
  };

  return (
    <div style={containerStyle}>
      <img src="/images/logoB.png" alt="Logo" style={logoStyle} />
      <div style={gridStyle}>
        {homes.map((home) => (
          <button
            key={home.id}
            onClick={() => setSelectedHome(home.id)}
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = buttonHoverStyle.transform}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <img src={home.image} alt={home.label} style={imageStyle} />
            <span style={labelStyle}>{home.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
