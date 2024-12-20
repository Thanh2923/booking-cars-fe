import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import DOMPurify from "dompurify";
const PromotionImage = ({ handleIsShow, content, imageUrl }) => {
  const handleHidden = () => {
    handleIsShow();
  };


  const ulrImgae = process.env.NEXT_PUBLIC_API_IMAGE;
  const parentContent = (content) => {
    const lines = content.split("#");
    const result = [];
    lines.forEach((line) => {
      if (line.includes("title:")) {
        const [key, value] = line.split(":");
        if (key && value) {
          result.push({ key: "title", value: value.trim() });
        }
      } else if (line.includes("span:")) {
        const [key, value] = line.split(":");
        if (key && value) {
          result.push({ key: "span", value: value.trim() });
        }
      } else if (line.trim()) {
        result.push({ key: "span", value: line.trim() }); // Default to span for any other content
      }
    });
    return result;
  }; 
  const renderHTML = (parsedData) => {
    return parsedData.map((item, index) => {
      if (item.key === "title") {
        return (
          <div key={index}>
            <div className="header">
              <h1 className="text-[1rem] text-[#141414] font-bold mb-[.5rem] text-center">
                {item.value}
              </h1>
            </div>
            <div className="line w-[100px] h-[2px] bg-blue-500 rounded-2xl mx-auto my-3"></div>
          </div>
        );
      } else if (item.key === "span") {
        return (
          <p key={index} className="text-[1rem] mb-[0.5rem] lg:mx-[100px]">
            {item.value}
          </p>
        );
      }
      return null; // If key doesn't match, return null (nothing rendered)
    });
  };

  const parentedContent = parentContent(content);
  const htmlContent = renderHTML(parentedContent);
  // Inside your component
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  return (
    <div className="fixed top-0 left-0 z-[100000]   bg-black/50">
      <div className="w-full p-[32px] lg:w-[50%] lg:mx-auto lg:mt-10  motion-preset-expand motion-duration-700 rounded-2xl bg-white shadow-xl">
        <CiCircleRemove
          onClick={handleHidden}
          className="text-blue-600 text-[2rem] ml-auto font-bold cursor-pointer"
        />
        <div className="content-img">
          <img
           src={`${ulrImgae}/src/uploads/${imageUrl}`}
            alt="image"
            className="rounded-2xl lg:w-[300px] mx-auto object-cover"
          />
        </div>
        <div className="content-body p-[30px]">
          {renderHTML(parentedContent)}
        </div>
      </div>
    </div>
  );
};

export default PromotionImage;
