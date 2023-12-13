const { readFileSync } = require("fs");
const input = readFileSync("./input.data", "utf8");

interface GameOfCube {
  gameId: number;
  sets: CubeSet[];
}

interface CubeSet {
  red?: number;
  green?: number;
  blue?: number;
}

const cubeBag = {
  red: 12,
  green: 13,
  blue: 14,
};
let totalGameIds = 0;
const lines = input.split("\n");
const gameRegex = /Game (\d+):/;

function extractGameIdFromLine(input: string): number {
  const gameString = input.match(gameRegex);
  if (!gameString) {
    throw new Error("Invalid input");
  }
  return parseInt(gameString[1]);
}
function extractSetsFromString(line: string): string[] {
  return line.split(":")[1].split(";");
}
function parseCubSet(setString: string): CubeSet {
  const cleanedString = setString.trimStart();
  const cubeHandfuls = cleanedString.split(", ");
  return parseColorAndNumberOfCubes(cubeHandfuls);
}

function parseColorAndNumberOfCubes(cubeStringArray: string[]): CubeSet {
  const cubeSet = {} as CubeSet;
  cubeStringArray.map((cubeString) => {
    const colorAndNumber = cubeString.split(" ");
    const numberOfCubes = parseInt(colorAndNumber[0]);
    const color = colorAndNumber[1];
    cubeSet[color] = numberOfCubes;
  });
  return cubeSet;
}

function gameParser(input: string): GameOfCube {
  const setsStringArray = extractSetsFromString(input);
  const sets = setsStringArray.map((setString) => parseCubSet(setString));
  const game = {
    gameId: extractGameIdFromLine(input),
    sets: sets,
  } as GameOfCube;
  return game;
}

function isSetPossible(set: CubeSet): boolean {
  for (const color in set) {
    if (set[color] > cubeBag[color]) {
      return false;
    }
  }
  return true;
}

function isGamePossible(sets: CubeSet[]): boolean {
  return sets.every((set) => isSetPossible(set));
}

for (const line of lines) {
  const game = gameParser(line);
  if (isGamePossible(game.sets)) {
    totalGameIds += game.gameId;
  }
}

console.log({ totalGameIds });
