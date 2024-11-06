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
        if (setHighlightedIndex) {
          setHighlightedIndex(-1); // Only call setHighlightedIndex if it is provided
        }
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
