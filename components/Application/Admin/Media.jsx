import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import React from 'react'

const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {

    const handleCheck = () => {
        //
    }

  return (
    <div className="border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden">
        <div className="absolute top-2 left-2 z-20">
            <Checkbox checked={ selectedMedia.includes( media._id ) } onCheckedChange={ handleCheck }/>
        </div>
        <div>
            <Image 
                src={ media?.secure_url } 
                alt={ media?.alt || 'Image' }
                height={300}
                width={300}
                className="object-cover w-full sm:h-[200px] h-[150px]" />
        </div>
    </div>
  )
}

export default Media