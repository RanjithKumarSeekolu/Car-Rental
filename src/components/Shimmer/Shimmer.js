import React from "react";
import "./Shimmer.css"; // Import your CSS file

const Shimmer = () => {
  return (
    <div>
      <div class="container" className="px-[10%] mb-5">
        <article>
          <div className="flex flex-row mx-10">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="shimmer"></div>
        </article>
      </div>
      <div class="container" className="flex flex-wrap px-[10%]">
        {new Array(6).fill(null).map((item, index) => {
          return (
            <article
              key={index}
              className="flex flex-col flex-grow box-border p-5 m-1 w-[350px]"
            >
              <div class="img-line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="shimmer"></div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Shimmer;
