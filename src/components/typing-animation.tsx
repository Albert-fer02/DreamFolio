"use client";

import { useState, useEffect, type FC } from "react";

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  className?: string;
}

const TypingAnimation: FC<TypingAnimationProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2000,
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingTimeout(deletingSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingTimeout(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingTimeout);
    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopNum,
    texts,
    typingSpeed,
    deletingSpeed,
    delay,
    typingTimeout,
  ]);

  return (
    <span className={`border-r-2 border-primary pr-1 ${className}`}>
      {text}
    </span>
  );
};

export default TypingAnimation;
