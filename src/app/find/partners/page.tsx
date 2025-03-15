"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SwipeParteners() {
  const [swiped, setSwiped] = useState(false);
  const [direction, setDirection] = useState(0);


  const profileImage = "/images/profile-avatar-1.png"; 

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
          className="absolute mt-[-120px] w-[80%] md:w-[30%] h-[70%] bg-[#131d4c] rounded-lg shadow-lg border-2 border-indigo-900 flex flex-col items-center justify-center text-white text-lg p-4"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          animate={{ x: direction, opacity: swiped ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          exit={{ x: direction, opacity: 0 }}
        >

          <div className="relative w-24 h-24 mb-4">
            <Image 
              src={profileImage} 
              alt="Profile picture" 
              fill 
              className="rounded-full object-cover"
            />
          </div>

         
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row gap-x-7 justify-center">
              <div>Nume</div>
              <div>Vârstă</div>
              <div>Sex</div>
            </div>
            <div>Limbi</div>
            <div>Tehnologii</div>
            <div>Work timing</div>
            <div className="text-blue-400 cursor-pointer hover:underline">Check Projects</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
