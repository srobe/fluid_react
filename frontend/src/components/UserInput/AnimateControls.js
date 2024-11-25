import React, { useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const AnimationControls = ({ onAnimate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [speed, setSpeed] = useState('1x');

  const speeds = ['0.25x', '0.5x', '1x', '1.25x', '1.5x'];

  const handleAnimate = useCallback(async () => {
    setIsLoading(true);
    try {
      await onAnimate();
      setIsLoaded(true);
      setIsPlaying(true);
    } catch (error) {
      console.error('Animation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onAnimate]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) {
    return (
      <div className="w-full bg-black rounded-b h-12 flex items-center px-4">
        {!isLoading ? (
          <button
            onClick={handleAnimate}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Animate
          </button>
        ) : (
          <span className="text-white">Animation loading...</span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-[#14181C] rounded-b h-12 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button className="text-white">
          <SkipBack size={20} />
        </button>
        <button onClick={handlePlayPause} className="text-white">
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </button>
        <button className="text-white">
          <SkipForward size={20} />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-white text-sm">Playback Speed</span>
        <div className="flex rounded-[25px] overflow-hidden border border-white">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 m-1 text-sm rounded-[25px] ${
                speed === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#14181C] text-gray-300 hover:bg-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;