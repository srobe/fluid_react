// src/hooks/useKeyboardNavigation.js
import { useEffect } from "react";

export const useKeyboardNavigation = ({
  isOpen,
  options,
  highlightedIndex,
  setHighlightedIndex,
  onSelect,
  processedOptions,
  setIsOpen,
  optionsRef,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prevIndex) => {
            const newIndex = prevIndex < options.length - 1 ? prevIndex + 1 : 0;
            scrollIntoView(newIndex);
            return newIndex;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : options.length - 1;
            scrollIntoView(newIndex);
            return newIndex;
          });
          break;
        case "Enter":
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            event.preventDefault();
            onSelect(processedOptions[highlightedIndex]);
            setIsOpen(false);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    const scrollIntoView = (index) => {
      if (optionsRef.current[index]) {
        optionsRef.current[index].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup the event listener on component unmount or dependency change
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options.length, onSelect, processedOptions, setHighlightedIndex, setIsOpen, optionsRef]);
};

export default useKeyboardNavigation;