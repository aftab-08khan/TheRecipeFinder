import React, { useEffect, useState } from "react";

const Alert = ({ children }) => {
  const emojiArr = ["😕", "🔍", "🙁", "🤔", "😞", "😶"];
  const [emoji, setEmoji] = useState("😶");

  useEffect(() => {
    const interval = setInterval(() => {
      setEmoji(emojiArr[Math.floor(Math.random() * emojiArr.length) + 1]);
    }, 800);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <p className="relative text-xl md:text-2xl mt-6 text-red-800 max-w-2xl">
      {children}
      <span key={emoji} className="animate-bounce ml-2 inline-block">
        {emoji}
      </span>
    </p>
  );
};

export default Alert;
