import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialSchedules } from '../data/initialSchedules';
import type { Schedule, ScheduleInput } from '../types/schedule';

const STORAGE_KEY = 'personal-scheduler-app-state';

type ScheduleState = {
  schedules: Schedule[];
};

type ScheduleAction =
  | { type: 'ADD_SCHEDULE'; payload: ScheduleInput }
  | { type: 'TOGGLE_COMPLETE'; payload: string }
  | { type: 'DELETE_SCHEDULE'; payload: string }
  | { type: 'RESET_SAMPLE' };

type ScheduleContextValue = {
  schedules: Schedule[];
  totalCount: number;
  completedCount: number;
  incompleteCount: number;
  addSchedule: (input: ScheduleInput) => void;
  toggleComplete: (id: string) => void;
  deleteSchedule: (id: string) => void;
  resetSample: () => void;
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const createId = () => `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const loadInitialState = (): ScheduleState => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return { schedules: initialSchedules };
  }

  try {
    const parsed = JSON.parse(saved) as ScheduleState;
    return Array.isArray(parsed.schedules) ? parsed : { schedules: initialSchedules };
  } catch {
    return { schedules: initialSchedules };
  }
};

const reducer = (state: ScheduleState, action: ScheduleAction): ScheduleState => {
  switch (action.type) {
    case 'ADD_SCHEDULE':
      return {
        schedules: [
          ...state.schedules,
          {
            id: createId(),
            completed: false,
            ...action.payload
          }
        ]
      };
    case 'TOGGLE_COMPLETE':
      return {
        schedules: state.schedules.map((schedule) =>
          schedule.id === action.payload ? { ...schedule, completed: !schedule.completed } : schedule
        )
      };
    case 'DELETE_SCHEDULE':
      return {
        schedules: state.schedules.filter((schedule) => schedule.id !== action.payload)
      };
    case 'RESET_SAMPLE':
      return { schedules: initialSchedules };
    default:
      return state;
  }
};

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<ScheduleContextValue>(() => {
    const completedCount = state.schedules.filter((schedule) => schedule.completed).length;

    return {
      schedules: state.schedules,
      totalCount: state.schedules.length,
      completedCount,
      incompleteCount: state.schedules.length - completedCount,
      addSchedule: (input) => dispatch({ type: 'ADD_SCHEDULE', payload: input }),
      toggleComplete: (id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id }),
      deleteSchedule: (id) => dispatch({ type: 'DELETE_SCHEDULE', payload: id }),
      resetSample: () => dispatch({ type: 'RESET_SAMPLE' })
    };
  }, [state]);

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error('useSchedule must be used inside ScheduleProvider');
  }

  return context;
};
