import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(image)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
    setConfirmDelete(false)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            onClick={onChooseFile}
            className="bg-primary w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />

          {/* If not confirming → show delete button */}
          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-1 -right-1"
            >
              <LuTrash />
            </button>
          ) : (
            // Small confirm container
            <div className="absolute -bottom-2 -right-2 flex gap-2 bg-white shadow-md rounded-md p-1">
              <button
                onClick={handleRemoveImage}
                className="bg-green-500 text-white rounded-md px-2 py-1 text-xs hover:bg-green-600"
              >
                ✔
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 text-black rounded-md px-2 py-1 text-xs hover:bg-gray-400"
              >
                ✖
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
