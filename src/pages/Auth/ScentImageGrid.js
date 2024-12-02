import React, { useState } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 5px;  /* 열 사이의 간격을 5px로 줄였습니다 */
  row-gap: 20px;    /* 행 사이의 간격은 그대로 유지합니다 */
  margin-top: 40px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CircleImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => (props.selected ? "#00656D" : "#ccc")};
  cursor: pointer;

  &:hover {
    border-color: #00656D;
  }
`;

const Label = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: #000000;
  opacity: ${(props) => (props.selected ? "100%" : "50%")};
  text-align: center;
`;

const Tooltip = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  background-color: #E0E0E0;
  color: #000000;
  text-align: left;
  padding: 5px 10px;
  border-radius: 6px;
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  white-space: nowrap;
  max-width: 500px;
  font-size: 12px;
`;

const ScentImageGrid = ({ images, selectedImages, onImageClick }) => {

  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <GridContainer>
      {images.map((image, index) => (
        <ImageContainer
          key={index}
          onMouseEnter={() => setHoveredImage(index)}
          onMouseLeave={() => setHoveredImage(null)}
          >
          <CircleImage
            src={image.src}
            alt={image.kr_name}
            selected={selectedImages.includes(image.en_name)}
            onClick={() => onImageClick(image.en_name)}
          />
          <Label selected={selectedImages.includes(image.en_name)}>
            {image.kr_name}
          </Label>
          <Tooltip visible={hoveredImage === index}>{image.tooltip}</Tooltip>
        </ImageContainer>
      ))}
    </GridContainer>
  )
};

export default ScentImageGrid;