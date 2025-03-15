"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SwipeParteners() {
  const [swiped, setSwiped] = useState(false);
  const [direction, setDirection] = useState(0);


  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 150) {
      setDirection(500); 
      setSwiped(true);
    } else if (info.offset.x < -150) {
      setDirection(-500); 
      setSwiped(true);
    } else {
      setDirection(0); 
      setSwiped(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0d1117] overflow-hidden">
      {!swiped && (
        <motion.div
          className="absolute mt-[-80] w-[80%] md:w-[30%] h-[70%] bg-[#131d4c] rounded-lg shadow-lg border-2 border-indigo-900 flex items-center justify-center text-white text-lg"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          animate={{ x: direction, opacity: swiped ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          exit={{ x: direction, opacity: 0 }}
        >
          <div className="flex flex-col">
          <img
                src="/assets/images/profile-avatar-1.png"
                alt="Profile picture"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
          <div className="flex flex-row gap-x-7">
              
                <div>
                Nume
              </div>
              <div>
                Varstă
              </div>
              <div>
                Sex
              </div>
            </div>
          <div>
            Limbi
          </div>
          <div>
            Tehnologii
          </div>
          <div>
            Work timeng
          </div>
          <div>
            Check Projects
          </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
