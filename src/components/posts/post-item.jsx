'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useDropdown } from '../payment/payDropdown';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Likepost, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import ChoosePayModal from '../payment/ChoosePay';
import Chatting from '../chatting/Chatting';
import axios from 'axios';

export default function PostItem({ postData, posts, accessToken }) {
  const router = useRouter();
  const { showDropdown, handleOpenDropdown, dropdownRef } = useDropdown();
  const [isMounted, setIsMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const linkPath = `/${postData.post_id}`;
  const linkProfile = `/profile/${postData.nick_name}`;
  const formattedPrice = postData.price.toLocaleString('ko-KR');
  const likedBtnSrc = liked
    ? '/images/png/icon-heart-fill.png'
    : '/images/png/icon-heart.png';

  useEffect(() => {
    setIsMounted(true);
    setLiked(postData.like);
  }, [postData.like]);

  const handleLikeClick = async () => {
    if (!accessToken) {
      router.push('/user/login');
    }
    try {
      if (liked) {
        // 이미 좋아요를 눌렀을 경우
        const response = await DeleteLike(accessToken, postData.post_id);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await DeleteLike(NewaccessToken, postData.post_id);
        }
        setLiked(false);
      } else {
        // 아직 좋아요를 누르지 않은 경우
        const response = await Likepost(accessToken, postData.post_id);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await Likepost(NewaccessToken, postData.post_id);
        }
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    }
  };

  const handleChatClick = async () => {
    if (!accessToken) {
      router.push('/user/login');
      return;
    }

    try {
      // 채팅방 생성 요청 API
      const response = await axios.post(
        `http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/chatroom/make/post/${postData.post_id}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 200) {
        router.push(`/chat/${postData.post_id}`);
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류가 발생했습니다.', error);
    }
  };

  if (postData.state !== 1) {
    return null;
  }

  return (
    <StyledWrapper>
      <Link href={linkProfile} className="wrapper-profile-info">
        <img
          src={postData.user_profile}
          alt="프로필 이미지"
          className="img-profile"
        />
        <div className="wrapper-name">
          <p className="nickname">{postData.nick_name}</p>
          <p className="postname">{postData.post_name}</p>
        </div>
      </Link>

      <div className="wrapper-bottom">
        <Link href={linkPath} className="wrapper-img-info">
          <img
            src={postData.image_post}
            alt="상품 이미지"
            className="img-post"
          />
          <span className="post_info">{postData.post_info}</span>
        </Link>

        <div className="wrapper-btns">
          <div className="wrapper-price">
            <p>수강비</p>
            <span>{formattedPrice}원</span>
          </div>

          {isMounted && (
            <div className="wrapper-info-btns">
              <button className="btn-like" onClick={handleLikeClick}>
                <img src={likedBtnSrc} alt="좋아요 버튼" />
              </button>

              {/* 채팅하기 버튼 */}
              <button onClick={handleChatClick} className="btn-chatting">
                <Chatting />
              </button>

              <div className="dropdown-container" ref={dropdownRef}>
                <button onClick={handleOpenDropdown} className="btn-choose">
                  <img
                    src="/images/svg/icon-shopping-cart.svg"
                    alt="구매하기"
                  />
                </button>
                {showDropdown && (
                  <ChoosePayModal
                    accessToken={accessToken}
                    postId={postData.post_id}
                    post={postData}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 288px;
  height: 380px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);

  button {
    cursor: pointer;
  }

  .wrapper-profile-info {
    display: flex;
    gap: 12px;
    padding: 12px 12px 0 12px;
    height: 64px;

    .img-profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .wrapper-name {
      display: flex;
      flex-direction: column;
      justify-items: center;

      .nickname {
        font-size: 15px;
        font-weight: bold;
        font-family: 'Pretendard';
        color: #29363d;
      }
      .postname {
        font-size: 12px;
        font-weight: 500;
        font-family: 'Pretendard';
        color: #5a6a72;
      }
    }
  }

  .wrapper-bottom {
    padding: 12px 12px 0 12px;

    .wrapper-img-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .img-post {
        width: 100%;
        height: 196px;
        object-fit: cover;
      }
      span,
      p {
        font-family: 'Pretendard';
      }
      .post_info {
        color: #5a6a72;
        font-size: 12px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 20px;
      }
    }

    .wrapper-btns {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;

      .wrapper-price {
        display: flex;
        gap: 8px;
        > p {
          font-weight: bold;
          color: #29363d;
        }
        > span {
          color: #29363d;
        }

        span,
        p {
          font-family: 'Pretendard';
        }
      }
      .dropdown-container {
        position: relative;
      }
      .wrapper-info-btns {
        display: flex;
        position: relative;
        gap: 9px;

        .btn-like {
          background-color: #ffffff;
          border: none;
          > img {
            width: 20px;
            height: 20px;
          }
        }

        .btn-chatting {
          border: none;
        }
        .btn-choose {
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: #ffffff;
          border: none;
          font-family: 'Pretendard Variable';

          > img {
            width: 20px;
            height: 23px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
