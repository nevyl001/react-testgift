import React, { useState } from "react";
import axios from "axios";
import "./styles/GifExpertApp.css";

export const GifExpertApp = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, per_page: 12 },
          headers: {
            Authorization:
              "Client-ID X4BKfmWvSeV8jrtyHfCz9mHfGvjc1TVY1MyCIePTd2s",
          },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error al buscar imágenes:", error);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Buscador de Imágenes</h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej. autos, gatos, naturaleza..."
        />
        <button className="search-button" onClick={fetchImages}>
          Buscar
        </button>
      </div>

      {loading && <p className="loading">🔄 Cargando imágenes...</p>}

      {!loading && images.length === 0 && (
        <p className="no-results">
          No se encontraron resultados. Intenta otra búsqueda.
        </p>
      )}

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-card">
            <img src={img.urls.small} alt={img.alt_description} />
            <p className="image-card-description">
              {img.alt_description || "Sin descripción"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
