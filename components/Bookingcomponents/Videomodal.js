"use client"

import { useState } from 'react'
import { Dialog } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'



export function VideoModal({ videoUrl }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-8 transform -translate-x-1/2 -translate-y-1/2 bg-[#004AAD]/90 hover:bg-[#F30278]/70 rounded-full w-10 h-10 flex items-center justify-center group transition-all duration-200"
      >
        <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="#F30278" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="z-50 w-[90vw] h-[80vh] max-w-6xl bg-black rounded-lg overflow-hidden"
            >
              <Button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 rounded-full w-10 h-10 bg-black/50 hover:bg-black/70"
              >
                <X className="w-6 h-6 text-white" />
              </Button>
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-fill"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

