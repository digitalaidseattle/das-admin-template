import { BoardSections } from '../types';

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: number
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};