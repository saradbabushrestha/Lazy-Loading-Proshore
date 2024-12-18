import { useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from "./Card";
import { LoadingPosts } from "./LoadingPosts";
import posts from "./data.json";

const NUM_PER_PAGE = 6;

export const Posts = () => {
  const images = posts["data"];
  const triggerRef = useRef(null);

  const onGrabData = (currentPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = images.slice(
          (currentPage - 1) * NUM_PER_PAGE,
          currentPage * NUM_PER_PAGE
        );
        console.log("Fetched Data:", data);
        resolve(data);
      }, 3000);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  return (
    <>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((image, index) => (
          <Card
            key={index}
            owner={image["owner"]}
            imageUrl={image["imageUrl"]}
          />
        ))}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        {loading && <LoadingPosts />}
      </div>
    </>
  );
};
