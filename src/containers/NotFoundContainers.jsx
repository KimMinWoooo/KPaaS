'use client';

import Link from 'next/link';
import styled from 'styled-components';
import SearchSection from '@compoents/components/items/SearchSection';

export default function NotFoundContainer() {
  return (
    <StyledWrapper>
      <SearchSection />
      <div className="error-container">
        <div className="error-icon">:(</div>
        <h1 className="error-heading">404 ERROR</h1>
        <p className="error-message">페이지를 찾을 수 없습니다.</p>
        <p className="error-description">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          입력하신 내용이 정확한지 다시 한 번 확인해주세요.
        </p>
        <div className="error-buttons">
          <Link href="/">
            <button className="error-button">메인 페이지</button>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;

  .error-container {
    text-align: center;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .error-heading {
    font-size: 36px;
    margin-bottom: 10px;
    color: #333;
  }

  .error-message {
    font-size: 18px;
    margin-bottom: 20px;
    color: #555;
  }

  .error-description {
    font-size: 14px;
    color: #777;
    margin-bottom: 30px;
  }

  .error-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .error-button {
    padding: 10px 20px;
    background-color: #00c73c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #00a532;
    }
  }
`;
