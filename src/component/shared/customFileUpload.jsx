import React, { useState } from "react";

const CustomFile = React.forwardRef(function CustomFile(
  { type = "file", classname = "", mediaUrl, ...props },
  ref
) {
  const [fileUrl, setfileUrl] = useState(mediaUrl);
  function handleChange(file) {
    console.log(file);
    setfileUrl(URL.createObjectURL(file[0]));
  }
  return (
    <div className="flex flex-center flex-col  bg-dark-3 rounded-xl cursor-pointer p-2 pb-4">
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="pb-4">click to replace photo</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">Upload Photo</h3>
          <p className="text-light-4 small-regular mb-6">SVG,JPG,PNG</p>
        </div>
      )}
      {/* <label htmlFor="file" className="p-2 bg-white text-black  rounded-lg">
        Upload file
      </label> */}
      <input
        id="file"
        type="file"
        className={`${classname}  `}
        ref={ref}
        {...props}
        onChange={(e) => {
          console.log(e.target.files);
          handleChange(e.target.files);
        }}
      />
    </div>
  );
});

export default CustomFile;
