import { readFileSync } from "fs";

const input: string = readFileSync("./input.data", "utf8");

const lines = input.split("\n");

let totalOfPoints = 0;

function extractSetOfNumbersFromString(line: string): string {
  return line.split(":")[1];
}

function extractWinningNumbersFromLine(line: string): number[] {
  const setOfNumbers = extractSetOfNumbersFromString(line);
  const setOfWinningNumbers = setOfNumbers.split(" | ")[0].trim();
  const numbers = setOfWinningNumbers
    .split(" ")
    .map((number) => parseInt(number));
  return numbers;
}

function extractPlayersNumbers(line: string): number[] {
  const setOfNumbers = extractSetOfNumbersFromString(line);
  let setOfWinningNumbers = setOfNumbers.split(" | ")[1].trim();
  setOfWinningNumbers = setOfWinningNumbers.replace(/  +/g, " ");

  const numbers = setOfWinningNumbers
    .split(" ")
    .map((number) => parseInt(number));

  return numbers;
}

// get the number of matches between the winning numbers and the players numbers
function getNumberOfMatches(
  winningNumbers: number[],
  playersNumbers: number[]
): number {
  let numberOfMatches = 0;
  winningNumbers.forEach((winningNumber) => {
    if (playersNumbers.includes(winningNumber)) {
      numberOfMatches++;
    }
  });
  return numberOfMatches;
}

function getPointsOfLine(line: string): number {
  let points = 0;
  const winningNumbers = extractWinningNumbersFromLine(line);
  const playersNumbers = extractPlayersNumbers(line);
  const numberOfMatches = getNumberOfMatches(winningNumbers, playersNumbers);
  if (numberOfMatches > 0) {
    points = Math.pow(2, numberOfMatches - 1);
  }
  return points;
}

for (const line of lines) {
  totalOfPoints += getPointsOfLine(line);
}
console.log({ totalOfPoints });

export {
  extractPlayersNumbers,
  extractSetOfNumbersFromString,
  extractWinningNumbersFromLine,
  getNumberOfMatches,
};
