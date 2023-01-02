import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollArea = () => {
  const { scrollY } = useScroll()
  const scrollContent = useTransform(
    scrollY,
    [0, 100],
    [0, -1000],
  )



  return (
    <div className=" bg-gray-200 relative">
      <motion.div className="h-[500px] w-40  from-red-800 to-indigo-500 bg-gradient-to-b"
      style={{ translateY: scrollContent }}
      >yo</motion.div>
      <motion.div className="h-[500px] w-40  from-red-800 to-indigo-500 bg-gradient-to-b"
      style={{ translateY: scrollContent }}
      >yo</motion.div>
      <div className="h-screen py-48"></div>
      <div className="h-screen py-48"></div>
      <div className="h-screen py-48"></div>
      
    </div>
  )
}

export default ScrollArea