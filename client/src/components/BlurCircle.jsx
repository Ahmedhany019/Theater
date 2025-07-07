import React from 'react'

function BlurCircle({top = "auto", right = "auto", bottom = "auto", left = "auto"}) {
  return (
    <div style={{top, right, bottom, left}} className={`absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl`}>
    </div>
  )
}

export default BlurCircle