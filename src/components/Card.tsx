import React, { CSSProperties, FC } from "react";
import styled from "styled-components";

type CardProps = {
  style?: CSSProperties;
  className?: string;
};
export const Card: FC<CardProps> = ({ children, style, className }) => {
  return (
    <CardStyle style={style} className={className}>
      {children}
    </CardStyle>
  );
};
const CardStyle = styled.div`
  padding: 8px 12px;
  width: 94%;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-inline: auto;
  margin-bottom: 10px;
`;
