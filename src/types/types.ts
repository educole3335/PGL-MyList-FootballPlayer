export type Category = {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  positionAbbr: string;
};

export type Player = {
  id: string;
  name: string;
  category: string;
  price: number;
  marked: boolean;
  position: string;
  team: string;
  awards: string;
};
