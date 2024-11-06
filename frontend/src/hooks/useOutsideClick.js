// src/hooks/useOutsideClick.js

import { useEffect } from "react";

export const useOutsideClick = ({
    isOpen,
    componentRef,
    setHighlightedIndex,
    setIsOpen,
  }) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Add a guard to ensure componentRef and current are defined
        if (componentRef?.current && !componentRef.current.contains(event.target)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      // Cleanup the event listener on component unmount or dependency change
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, componentRef, setHighlightedIndex, setIsOpen]);
  };

  export default useOutsideClick;