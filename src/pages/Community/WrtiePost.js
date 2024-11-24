import React, { useState, useEffect } from "react";
import styled from "styled-components";
import qs from 'qs';

import example_note_img from '../../assets/images/Flavors/peach.jpg';
import ic_left_arrow from '../../assets/images/ic_left_arrow.png';
import ic_right_arrow from "../../assets/images/ic_right_arrow.png";
import apiClient from "../Auth/TokenReissue";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  width: 70%; /* 원하는 비율 설정 */
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PostTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PostTitleGuide = styled.h1`
  font-size: 28px;
  font-family: "Pretendard-Bold";
  text-align: left;
  margin: 0;
`;

const Divider = styled.hr`
  width: 80vw;
  border: none;
  border-top: 1px solid #E6E6E6;
  margin: 20px 10px 20px 10px;
`;

const TitleLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin
`;

const TitleLabel = styled.p`
  font-size: 20px;
  font-family: "Pretendard-SemiBold";
  text-align: left;
  margin: 10px 10px 20px 0px;
`;

const PerfumeListContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

const PerfumeCardContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border: ${(props) => (props.selected ? '3px solid #00656D' : 'none' )};
`;

const PerfumeTitle = styled.p`
  font-size: 18px;
  font-family: "Pretendard-Bold";
  text-align: center;
`;

const NoteItem = styled.div`
  display: flex;
  align-items:  center;
  margin-bottom: 15px;
  min-height: 60px;
`;

const NoteImagesContainer = styled.div`
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 80px; // 이미지 컨테이너의 일관된 너비를 보장
  min-height: 60px;
  margin-left: 20px;
  flex-wrap: nowrap;
`;

const NoteImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NoteTextContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NoteTitle = styled.p`
  font-size: 14px;
  font-family: "Pretendard-SemiBold";
  margin: 0;
  text-align: center;
`;

const NoteName = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  margin: 0;
  text-align: center;
  color: #737373;
`;

const ArrowIcon = styled.img`
  width: 90px;
  height: 90px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 3px solid #00656D;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Montserrat-Regular";
  box-sizing: border-box;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 500px;
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #00656D;
  border-radius: 10px;
  font-size: 18px;
  font-family: "Montserrat-Regular";
  box-sizing: border-box;
  outline: none;
`;

const ButtonContanier = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const SubmitPostButton = styled.button`
  width: 90px;
  font-size: 20px;
  font-family: "Pretendard-SemiBold";
  color: #ffffff;
  background-color: #00656D;
  border: none;
  border-radius: 10px;
  padding: 10px;
`;

const WritePost = () => {

  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 향수 목록 시작 인덱스(0)
  const [scentImages, setScentImages] = useState({}); // 향료 이미지 저장

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(null);
  
  // 페이지 랜더링 시 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 전체 향수 목록 조회
  useEffect(() => {
    const fetchPerfumeData = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');

        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다');
          // 토큰 x -> 로그인 화면 리다이렉션
          return;
        }

        const response = await apiClient.get(`api/perfume`);

        if (response.status === 200) {
          const { code, data } = response.data;

          if (code === '0000') {
            setPerfumes(data);
          }
        }
      } catch (error) {
        console.error('향수 목록 조회 중 오류', error);
      }
    };

    fetchPerfumeData();
  }, []);

  // 향료 이미지 조회
  const fetchScentImages = async (notes) => {
    try {
      const response = await apiClient.get('/api/s3/scent-images', {
        params: {
          scents: notes,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      });

      const imageUrls = response.data;
      const imageMap = {};

      // 향료 이름 -> key, 이미지 URL -> value로 매핑
      notes.forEach(note => {
        const scentName = note.note_en;
        imageMap[scentName] = imageUrls[scentName] || example_note_img; // 기본 이미지
      });

      setScentImages(imageMap); // 이미지 URL 저장
    }  catch (error) {
      console.error("향료 이미지 조회 중 오류 발생", error);
    }
  };

  // // 향수 목록 변경 -> 향료 이미지 조회
  // useEffect(() => {
  //   const allNotes = perfumes.flatMap(perfume => {
  //     const { topNotes, middleNotes, baseNotes } = splitNotes(perfume.notes);
  //     return [...topNotes, ...middleNotes, ...baseNotes];
  //   });

  //   // 향수 목록에 있는 모든 향료 이미지 조회
  //   if (allNotes.length > 0) {
  //     fetchScentImages(allNotes);
  //   }
  // }, [perfumes]); // perfumes가 변경될 때마다 실행

  // 화살표 클릭 -> 다음 3개 향수 이동
  const handleNext = () => {
    if (currentIndex + 3 < perfumes.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  // 화살표 클릭 -> 이전 3개 향수
  const handlePrev = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  // 노트별 분리
  const splitNotes = (notes) => {
    const topNotes = [];
    const middleNotes = [];
    const baseNotes = [];

    notes.forEach(note => {
      if (note.note_en.startsWith("TOP_")) {
        topNotes.push(note);
      } else if (note.note_en.startsWith("MIDDLE_")) {
        middleNotes.push(note);
      } else if (note.note_en.startsWith("BASE_")) {
        baseNotes.push(note);
      }
    });

    return { topNotes, middleNotes, baseNotes };
  };

  // 향수 선택 처리
  const handlePerfumeCardClick = (perfumeId) => {
    setSelectedPerfumeId(perfumeId === selectedPerfumeId ?  null : perfumeId); // 이미 선택된 향수 카드 -> 선택 해제
  };

  // 선택된 향수 디버깅 로그
  useEffect(() => {
    console.log("선택된 향수: ", selectedPerfumeId);
  }, [selectedPerfumeId]);

  // 글 등록 버튼
  const handleSubmit = async () => {
    const memberId = localStorage.getItem('memberId');
    const perfumeId = selectedPerfumeId;

    if (!perfumeId) {
      console.error('향수를 선택해주세요.');
      return;
    }

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    const requestData = {
      title: title,
      content: content
    };

    try {
      const response = await apiClient.post(`api/posts/write/${memberId}/${perfumeId}`,
        requestData
      );

      if (response.status === 200) {
        alert('글이 성공적으로 등록되었습니다.');
        navigate('/community');
      } else {
        alert('글 등록에 실패하였습니다.');
        console.error('글 등록 실패', response.data);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생', error);
    }
  };
  
  return (
    <MainContainer>
      <PostTitleContainer>
        <PostTitleGuide>공유할 당신의 향수를 선택하세요!</PostTitleGuide>
        <Divider/>

        <PerfumeListContainer>
          <ArrowIcon
            src={ic_left_arrow}
            alt="Previous"
            onClick={handlePrev}
            // style={{ transform: 'rotate(180deg)' }} -> 이미지 180도 회전
            />
            {perfumes.slice(currentIndex, currentIndex + 3).map((perfume) => {
              const { topNotes, middleNotes, baseNotes } = splitNotes(perfume.notes);

            return (
              <PerfumeCardContainer
                key={perfume.perfumeId}
                selected={perfume.perfumeId === selectedPerfumeId} // 선택된 향수 카드에 스타일 추가
                onClick={() => handlePerfumeCardClick(perfume.perfumeId)} // 향수 카드 클릭 시 함수
                >
                <PerfumeTitle>{perfume.title || "제목 없음"}</PerfumeTitle>

                {/* Top Notes */}
                {topNotes.length > 0 && (
                  <NoteItem>
                    <NoteTextContainer>
                      <NoteTitle>Top Notes</NoteTitle>
                      <NoteName>{topNotes.map(note => note.note_kr).join(' & ')}</NoteName>
                    </NoteTextContainer>
                    <NoteImagesContainer>
                      {topNotes.map((note, index) => (
                        <NoteImage
                          key={index}
                          src={scentImages[note.note_en] || example_note_img} /> // 매칭된 이미지 url
                      ))}
                    </NoteImagesContainer>
                  </NoteItem>
                )}

                {/* Middle Notes */}
                {middleNotes.length > 0 && (
                  <NoteItem>
                    <NoteTextContainer>
                      <NoteTitle>Middle Notes</NoteTitle>
                      <NoteName>{middleNotes.map(note => note.note_kr).join(' & ')}</NoteName>
                    </NoteTextContainer>
                    <NoteImagesContainer>
                      {middleNotes.map((note, index) => (
                        <NoteImage
                          key={index}
                          src={scentImages[note.note_en] || example_note_img} />
                      ))}
                    </NoteImagesContainer>
                  </NoteItem>
                )}

                {/* Base Notes */}
                {baseNotes.length > 0 && (
                  <NoteItem>
                    <NoteTextContainer>
                      <NoteTitle>Base Notes</NoteTitle>
                      <NoteName>{baseNotes.map(note => note.note_kr).join(' & ')}</NoteName>
                    </NoteTextContainer>
                    <NoteImagesContainer>
                      {baseNotes.map((note, index) => (
                        <NoteImage
                          key={index}
                          src={scentImages[note.note_en] || example_note_img} />
                      ))}
                    </NoteImagesContainer>
                  </NoteItem>
                )}
              </PerfumeCardContainer>
            );
          })}

          <ArrowIcon
            src={ic_right_arrow}
            alt="Next"
            onClick={handleNext}
            style={{ right: 0 }}/>

        </PerfumeListContainer>
      </PostTitleContainer>

      <PostTitleContainer>
        <PostTitleGuide>당신의 향수에 대해 공유해주세요!</PostTitleGuide>
        <Divider/>
      </PostTitleContainer>

      <TitleLabelContainer>
        <TitleLabel>제목</TitleLabel>
      </TitleLabelContainer>
      <TitleInput
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />

      <TitleLabelContainer>
        <TitleLabel>내용</TitleLabel>
      </TitleLabelContainer>
      <ContentInput
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)} />

      <ButtonContanier>
        <SubmitPostButton onClick={handleSubmit}>글 등록</SubmitPostButton>
      </ButtonContanier>
    </MainContainer>
  );
}

export default WritePost;