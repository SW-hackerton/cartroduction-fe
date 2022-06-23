import { useEffect, useState } from 'react';
import * as S from './style';

export function Dashboard({ data, page, idx }) {
  const mobileSize = 768;
  const rowContentCnt = 4;
  const mobileContentCnt = 2;

  const dashboardList = [
    {
      title: '타이어 교체',
      contents: [
        {
          key: '교체 주기 : ',
          value: '100',
          unit: 'km',
        }, {
          key: '교체 횟수 : ',
          value: '100',
          unit: '번',
        }
      ]
    },
    {
      title: '엔진오일 교체',
      contents: [
        {
          key: '교체 주기 : ',
          value: '20000',
          unit: 'km',
        }, {
          key: '교체 횟수 : ',
          value: '100',
          unit: '번',
        },
      ]
    },
    {
      title: '침수 여부',
      contents: [
        {
          key: '없음',
        }
      ]
    },
    {
      title: '일반 수리',
      contents: [
        {
          key: '총 금액 : ',
          value: '100',
          unit: '원',
        }, {
          key: '총 횟수 : ',
          value: '100',
          unit: '번',
        }
      ]
    },
    {
      title: '사고 수리',
      contents: [
        {
          key: '총 금액 : ',
          value: '100',
          unit: '원',
        }, {
          key: '총 횟수 : ',
          value: '100',
          unit: '번',
        }
      ]
    },
    {
      title: '차량 점검',
      contents: [
        {
          key: '점검 주기 : ',
          value: '100',
          unit: 'km',
        }, {
          key: '총 점검 횟수 : ',
          value: '100',
          unit: '번',
        }
      ]
    },
    {
      title: '평균 주행거리',
      contents: [
        {
          key: '한달 기준 : ',
          value: '100',
          unit: 'km',
        }
      ]
    },
    {
      title: '',
      contents: []
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  const resizingHandler = () => {
    if (window.innerWidth <= mobileSize) setIsMobile(true);
    else setIsMobile(false);
  }

  useEffect(() => {
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  })

  const mkContent = ({ key, value, unit }, idx) => {
    return (
      <S.DscBox key={idx}>
        <S.DscBold>{key}</S.DscBold>
        <S.DscNormal>{value} {unit}</S.DscNormal>
      </S.DscBox>
    )
  }
  const mkBlock = ({ title, contents }, idx) => {
    return (
      <S.BoardBox key={idx}>
        <S.BoardTitle>{title}</S.BoardTitle>
        <S.DscWrap>
          {contents.map(mkContent)}
        </S.DscWrap>
      </S.BoardBox>
    )
  }
  const mkRow = (list, idx) => {
    return (
      <S.RowWrapper key={idx}>
        {list.map(mkBlock)}
      </S.RowWrapper>
    )
  }
  const mkDashboard = (list, cnt) => {
    const page = list.length / cnt;
    const data = [];
    for(let i = 0; i < page; i++) {
      data.push(list.slice(i*cnt, (i+1)*cnt));
    }
    return data.map(mkRow);
  }
  return (
    <S.Container>
      <S.Wrapper>
        {mkDashboard(dashboardList, isMobile ? mobileContentCnt : rowContentCnt)}
      </S.Wrapper>
    </S.Container>
  );
}