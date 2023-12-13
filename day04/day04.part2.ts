import { readFileSync } from "fs";
import {
  extractPlayersNumbers,
  extractWinningNumbersFromLine,
  getNumberOfMatches,
} from "./day04.part1";

const input: string = readFileSync("./input.data", "utf8");

const lines = input.split("\n");

interface ScratchCard {
  cardId: number;
  winningNumbersQuantity: number;
  numberOfCopies: number;
}

function processLine(line: string, cardId: number): ScratchCard {
  const winningNumbers = extractWinningNumbersFromLine(line);
  const playersNumbers = extractPlayersNumbers(line);
  const numberOfMatches = getNumberOfMatches(winningNumbers, playersNumbers);

  return {
    cardId: cardId,
    winningNumbersQuantity: numberOfMatches,
    numberOfCopies: 1,
  };
}

const scratchCards: ScratchCard[] = lines.map((line, index) =>
  processLine(line, index + 1)
);

function addCopiesToScratchCard(scratchCard: ScratchCard): void {
  if (scratchCard.winningNumbersQuantity === 0) {
    return;
  }
  for (
    let i = scratchCard.cardId + 1;
    i <= scratchCard.cardId + scratchCard.winningNumbersQuantity;
    i++
  ) {
    const cardIndex = scratchCards.findIndex((card) => card.cardId === i);
    if (cardIndex !== -1) {
      scratchCards[cardIndex].numberOfCopies += scratchCard.numberOfCopies;
    }
  }
}
scratchCards.forEach((card) => addCopiesToScratchCard(card));
const totalOfCopies = scratchCards.reduce(
  (acc, card) => acc + card.numberOfCopies,
  0
);
console.log({ totalOfCopies });
