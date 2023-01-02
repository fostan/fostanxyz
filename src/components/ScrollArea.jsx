import React from 'react'
import { motion, useScroll } from "framer-motion";

const ScrollArea = () => {
  const { scrollYProgress } = useScroll

  return (
    <div className=" bg-gray-200 relative">
      <motion.div className="h-20 fixed top-0  bg-red-800"
      style={{ scaleX: scrollYProgress }}
      >yo</motion.div>
      <div className="h-screen py-48"></div>
      <div className="h-screen py-48"></div>
      <div className="h-screen py-48"></div>
      
    </div>
  )
}

export default ScrollArea