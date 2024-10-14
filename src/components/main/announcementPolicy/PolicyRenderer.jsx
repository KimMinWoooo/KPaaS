import React from 'react';
import styled from 'styled-components';

function PolicyRenderer({ policyData }) {
  return (
    <StyledWrapper>
      <a href={policyData.url} target="_blank" rel="noopener noreferrer">
        <img
          src={policyData.thumbnailUrl}
          alt={policyData.title}
          className="img-policy"
        />
      </a>
      <div className="wrapper-desc">
        <p className="title">{policyData.title}</p>
        <p className="desc">{policyData.desc}</p>
      </div>
    </StyledWrapper>
  );
}

export default PolicyRenderer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 15px;

  .img-policy {
    width: 320px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .wrapper-desc {
    margin-top: 15px;
    text-align: center;

    .title {
      font-size: 100%;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .desc {
      font-size: 96%;
      color: #666;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;
    }
  }
`;
