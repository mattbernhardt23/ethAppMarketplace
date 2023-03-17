import { Button, Modal } from "@components/ui/common"
import { useState, useEffect } from 'react'



export default function VideoModal({ onClose, source, isOpen}) {
    
    console.log("source", source)
    const Video = ({source}) => (
        <div className="video-responsive">
          <iframe
            // width="853"
            // height="480"
            width="639"
            height="360"
            src={source}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      );

    

    const closeModal = () => {
        onClose()
    }
    
  
    if(isOpen){
      return (
      
        <Modal isOpen={isOpen}>
          <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-2 sm:align-middle sm:w-fit">
            <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="flex flex-row mb-4">
                    <div className="w-full flex flex-col items-center">
                        <Video source={source}/>
                        <div className="pt-6 m-auto">
                        <Button
                          className=""
                          variant="cyan"
                          onClick={() => {
                            closeModal()
                          }}  
                        >
                          Back to Results
                        </Button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>        
        </Modal> 
    )}
}
