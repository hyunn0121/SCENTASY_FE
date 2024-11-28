import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiClient from "../Auth/TokenReissue";


const MyPerfumeTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const MainPerfumeContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const PerfumeTitle = styled.h1`
  font-size: 28px;
  font-family: "Pretendard-Bold";
  margin: 0px;
`;

const TitleDescription = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin: 0px 0px 5px 15px;
`;

const Divider = styled.hr`
  width: 500px;
  border: none;
  border-top: 2px solid #000000;
  margin: 10px 0px 50px 0px;
`;

const PerfumeTab = () => {

  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Simulating server response
    const fetchData = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');

        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          return;
        }

        const response = await apiClient.get(`/${memberId}/accord-statistics`);

        if (response.status === 200) {
          const { code, data } = response.data;
          
          if (code === '0000') {
            setBarData(data);
          }
        }
      } catch (error) {
        console.error('어코드 통계 조회 중 오류 발생', error);
      }
    };

    fetchData();
  }, []);

  return(
    <MyPerfumeTabContainer>
      <TitleContainer>
        <PerfumeTitle>나의 향수 로그</PerfumeTitle>
        <TitleDescription>Get summary of your preference information here.</TitleDescription>
      </TitleContainer>
      <Divider/>

      <MainPerfumeContainer>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="accordName" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </MainPerfumeContainer>
    </MyPerfumeTabContainer>
  )
};

export default PerfumeTab;