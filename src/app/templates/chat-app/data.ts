export type User = {
  name: string;
  avatar: string;
};

export type Message = {
  from: string;
  to: string;
  text: string;
};

export const USERS: User[] = [
  {
    name: 'Dan',
    avatar:
      'https://tse3.mm.bing.net/th?id=OIP.Gb3HRxRLtoJW-n1X1MX9yQHaEo&pid=Api&P=0&h=180',
  },
  {
    name: 'Nakesnake',
    avatar:
      'https://tse4.mm.bing.net/th?id=OIP.rn7dtFyfDb6u169zCJLaFwHaHt&pid=Api&P=0&h=180',
  },
  {
    name: 'Bapilanitan',
    avatar:
      'https://tse4.mm.bing.net/th?id=OIP.4M7zCNj1Pt994WFYpARgkgHaFj&pid=Api&P=0&h=180',
  },
];

export const MESSAGES: Message[] = [
  { from: 'Dan', to: 'U', text: 'Heh' },
  { from: 'U', to: 'Dan', text: 'Whats up?' },
  { from: 'Dan', to: 'U', text: 'Heh' },
  { from: 'U', to: 'Dan', text: 'Whats up?' },
  { from: 'Dan', to: 'U', text: 'Heh' },
  { from: 'U', to: 'Dan', text: 'Whats up?' },
];
