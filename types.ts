
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface CalendarSource {
  id: string;
  src: string;
  name: string;
  color: string;
  active: boolean;
}
