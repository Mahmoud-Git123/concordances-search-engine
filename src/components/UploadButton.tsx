import React, { useState } from 'react';

const UploadButton = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const text = e.target.result;
          onUpload(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDelete = () => {
    setFileName(null);
    onUpload(null);
  };

  return (
    <div className="mb-4 flex items-center space-x-2">
      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="px-4 py-2 bg-gray-700 text-white rounded-2xl hover:bg-blue-800 transition-colors duration-300 cursor-pointer"
      >
        Upload XML File
      </label>
      {fileName && (
        <>
          <p className="mt-2 text-sm text-gray-600">Uploaded file: {fileName}</p>
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-red-500 text-white rounded-2xl hover:bg-red-700 transition-colors duration-300"
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default UploadButton;