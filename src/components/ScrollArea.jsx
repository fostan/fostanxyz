import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

import Card from './Card';

const ScrollArea = () => {
  const { scrollY } = useScroll()
  const scrollContentRevesed = useTransform(
    scrollY,
    [0, 500],
    [0, -500],
  )
  const scrollContent = useTransform(
    scrollY,
    [0, 500],
    [0, 1500],
  )




  return (
    <div className=" bg-gray-200 overflow-hidden">
      <div className="grid grid-cols-2 gap-8 p-8 h-[1300px]">
        <motion.div className="grid gap-8 "
        style={{ translateY: scrollContentRevesed }}
        >
          <Card content={"card one"} />
          <Card content={"card two"}/>
          <Card content={"card three"}/>
          <Card content={"card four"}/>
          <Card content={"card five"}/>

        </motion.div>
        <div className="transform translate-y-[-1000px]">
        <motion.div className="grid gap-8"
        style={{ translateY: scrollContent }}
        >
          <Card content={"card five"}/>
          <Card content={"card six"}/>
          <Card content={"card seven"}/>
          <Card content={"card eight"}/>
          <Card content={"card nine"}/>
        </motion.div>
        </div>
        
        
      </div>
    </div>
  )
}

export default ScrollArea