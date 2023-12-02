import { readFileSync } from "fs";

const input: string = readFileSync("./input.data", "utf8");

const wordsAndDigits: { [key: string]: number } = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let result = 0;

const inputArray: string[] = input.split("\n");

for (const line of inputArray) {
  let extractedDigits = "";
  for (const character of line) {
    if (/[a-zA-Z]/.test(character)) {
      extractedDigits +=
        wordsAndDigits[character.toLowerCase()] !== undefined
          ? wordsAndDigits[character.toLowerCase()]
          : "";
    } else if (/[\d]/.test(character)) {
      extractedDigits += character;
    }
  }
  const firstElement = extractedDigits.charAt(0);
  const lastElement = extractedDigits.charAt(extractedDigits.length - 1);
  const number = parseInt(`${firstElement}${lastElement}`);
  result += number;
}

console.log({ result });
