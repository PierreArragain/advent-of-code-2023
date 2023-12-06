import { readFileSync } from "fs";

const input: string = readFileSync("./input.data", "utf8");

const lines = input.split("\n");

const symbolRegex = /[^\w\s.]/;

const numberRegex = /\d+/g;

function getRangeIntegers(startNumber: number, endNumber: number): number[] {
  const list: number[] = [];
  for (let i = startNumber; i <= endNumber; i++) {
    list.push(i);
  }
  return list;
}

function isASymbol(character: string): boolean {
  return symbolRegex.test(character);
}

function isPreviousCharOrNextCharASymbol(
  line: string,
  firstCharIndex: number,
  lastCharIndex: number
): boolean {
  if (
    isASymbol(line.charAt(firstCharIndex - 1)) ||
    isASymbol(line.charAt(lastCharIndex + 1))
  ) {
    return true;
  }

  return false;
}

function areSymbolsAboveOrUnder(
  line: string,
  startIndex: number,
  endIndex: number
): boolean {
  let hasSymbol = false;
  const leftDiagonalIndex = startIndex === 0 ? startIndex : startIndex - 1;
  const rightDiagonalIndex =
    endIndex === line.length - 1 ? line.length - 1 : endIndex + 1;

  const numberRange = getRangeIntegers(leftDiagonalIndex, rightDiagonalIndex);
  for (let i = 0; i < numberRange.length; i++) {
    hasSymbol = isASymbol(line.charAt(numberRange[i]));
    if (hasSymbol) {
      return hasSymbol;
    }
  }
  return hasSymbol;
}

function extractLineValidNumbers(
  currentLine: string,
  nextLine: string,
  previousLine: string
): number {
  let lineTotal = 0;
  const lineNumberMatches = currentLine.matchAll(numberRegex);
  if (!lineNumberMatches) {
    return lineTotal;
  }
  for (const match of lineNumberMatches) {
    const numberFirstCharIndex = match.index!;
    const numberLastCharIndex = numberFirstCharIndex + match[0].length - 1;
    const isSurroundedByASymbol =
      isPreviousCharOrNextCharASymbol(
        currentLine,
        numberFirstCharIndex,
        numberLastCharIndex
      ) ||
      (previousLine &&
        areSymbolsAboveOrUnder(
          previousLine,
          numberFirstCharIndex,
          numberLastCharIndex
        )) ||
      (nextLine &&
        areSymbolsAboveOrUnder(
          nextLine,
          numberFirstCharIndex,
          numberLastCharIndex
        ));
    if (isSurroundedByASymbol) {
      lineTotal += parseInt(match[0], 10);
    }
  }

  return lineTotal;
}

// for each line, find numbers
function checkLines(lines: string[]): number {
  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const nextLine = i < lines.length ? lines[i + 1] : "";
    const previousLine = i > 0 ? lines[i - 1] : "";

    total += extractLineValidNumbers(currentLine, nextLine, previousLine);
  }
  return total;
}

console.log(checkLines(lines));
