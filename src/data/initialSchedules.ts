import type { Schedule } from '../types/schedule';

export const initialSchedules: Schedule[] = [
  {
    id: 'sample-1',
    title: 'React 과제 구조 정리',
    date: '2026-06-05',
    startTime: '10:00',
    endTime: '11:30',
    category: 'study',
    priority: 'high',
    memo: '캘린더 화면 구조와 일정 등록 흐름 정리하기',
    completed: false
  },
  {
    id: 'sample-2',
    title: '포트폴리오 자료 정리',
    date: '2026-06-05',
    startTime: '14:00',
    endTime: '15:00',
    category: 'work',
    priority: 'normal',
    memo: '프로젝트 제출 자료와 화면 캡처 위치 정리',
    completed: false
  },
  {
    id: 'sample-3',
    title: '운동',
    date: '2026-06-06',
    startTime: '19:00',
    endTime: '20:00',
    category: 'exercise',
    priority: 'low',
    memo: '가벼운 유산소 위주',
    completed: true
  }
];

export const categoryLabels = {
  study: '학습',
  work: '업무',
  personal: '개인',
  exercise: '운동',
  etc: '기타'
};

export const priorityLabels = {
  low: '낮음',
  normal: '보통',
  high: '높음'
};
