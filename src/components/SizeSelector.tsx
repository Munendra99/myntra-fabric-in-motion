import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  const [showSizeChart, setShowSizeChart] = useState(false);

  return (
    <div className="py-3">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-900 tracking-wider">
          SELECT SIZE
        </span>
        <button
          type="button"
          onClick={() => setShowSizeChart(true)}
          className="text-xs font-bold text-myntra-pink hover:underline uppercase tracking-wider"
        >
          SIZE CHART &gt;
        </button>
      </div>

      {/* Size Chips */}
      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                isSelected
                  ? 'border-2 border-myntra-pink text-myntra-pink bg-myntra-pinkLight shadow-sm'
                  : 'border border-gray-300 text-gray-800 hover:border-gray-400 bg-white'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-myntra-pink" />
                <h4 className="font-bold text-sm text-gray-900">Size Guide (Inches)</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeChart(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-2 font-bold text-gray-700">Size</th>
                    <th className="p-2 font-bold text-gray-700">Chest/Bust</th>
                    <th className="p-2 font-bold text-gray-700">Waist</th>
                    <th className="p-2 font-bold text-gray-700">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 font-bold text-myntra-pink">S</td>
                    <td className="p-2 text-gray-600">36"</td>
                    <td className="p-2 text-gray-600">30"</td>
                    <td className="p-2 text-gray-600">27"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-myntra-pink">M</td>
                    <td className="p-2 text-gray-600">38"</td>
                    <td className="p-2 text-gray-600">32"</td>
                    <td className="p-2 text-gray-600">28"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-myntra-pink">L</td>
                    <td className="p-2 text-gray-600">40"</td>
                    <td className="p-2 text-gray-600">34"</td>
                    <td className="p-2 text-gray-600">29"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-myntra-pink">XL</td>
                    <td className="p-2 text-gray-600">42"</td>
                    <td className="p-2 text-gray-600">36"</td>
                    <td className="p-2 text-gray-600">30"</td>
                  </tr>
                </tbody>
              </table>

              <button
                type="button"
                onClick={() => setShowSizeChart(false)}
                className="mt-4 w-full py-2.5 bg-myntra-pink text-white rounded-full font-bold text-xs uppercase shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
