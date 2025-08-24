import React, { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % recipe.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + recipe.images.length) % recipe.images.length
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden relative">
      {/* Carousel */}
      <div className="relative">
        <img
          src={recipe.images[currentImage]}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        {/* Watermark */}
        <span className="absolute bottom-2 right-2 text-white text-sm font-semibold opacity-70 italic">
          @cooktoadmire
        </span>
        {/* Controls */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <p className="text-gray-700 text-sm">{recipe.description}</p>
        <h3 className="mt-3 font-semibold">Ingredients:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <h3 className="mt-3 font-semibold">Instructions:</h3>
        <p className="text-sm text-gray-600">{recipe.instructions}</p>
      </div>
    </div>
  );
}
