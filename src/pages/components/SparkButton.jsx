import { useState, useRef } from "react";
import { motion } from "framer-motion";

import ClickSpark from "./ClickSpark";

export default function SparkButton({
  children,
  className = "",
  onClick,
  ...props
}) {
  const [sparkPosition, setSparkPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setSparkPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      <ClickSpark
        sparkSize={6}
        sparkRadius={20}
        sparkCount={12}
        duration={500}
        extraScale={1.2}
      />
    </motion.button>
  );
}
