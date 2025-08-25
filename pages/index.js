import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          MD. AL AMIN
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Web Developer & Designer
        </p>
        
        <div className="mb-8">
          <p className="text-white mb-4">Counter: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors mr-4"
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(0)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
        
        <div className="text-green-400">
          ✅ Fast Refresh Test - Try editing this text and save!
        </div>
      </div>
    </div>
  );
}