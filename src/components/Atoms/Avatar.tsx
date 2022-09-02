import Image from "next/image";
import React from "react";

const Avatar = ({
  src,
  name,
  width,
  height
}: {
  src: string;
  name: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div
      className="avatar-container"
      style={{
        clipPath: "circle(40%)"
      }}
    >
      <Image
        src={src || "/images/imagePlaceholder.jpg"}
        objectFit="cover"
        objectPosition="top"
        placeholder="blur"
        priority
        blurDataURL="/images/imagePlaceholder.jpg"
        width={width ? width : 70}
        height={height ? height : 70}
        alt={`${name}'s avatar`}
      />
    </div>
  );
};

export default Avatar;
