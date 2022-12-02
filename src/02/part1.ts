import fs from 'fs'

type Playable = 'A' | 'B' | 'C'
type Strategy = 'X' | 'Y' | 'Z'

type Option = {
  score: number
  victory: [Playable, Strategy]
  draw: [Playable, Strategy]
  loss: [Playable, Strategy]
}

const Options = {
  ROCK: {
    score: 1,
    victory: ['C', 'Z'],
    draw: ['A', 'X'],
    loss: ['B', 'Y'],
  },
  PAPER: {
    score: 2,
    victory: ['A', 'X'],
    draw: ['B', 'Y'],
    loss: ['C', 'Z'],
  },
  SCISSORS: {
    score: 3,
    victory: ['B', 'Y'],
    draw: ['C', 'Z'],
    loss: ['A', 'X'],
  },
} satisfies Record<string, Option>

const OptionMap: Record<Playable | Strategy, keyof typeof Options> = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS',
}

const isOption = (option: unknown): option is Playable => {
  return (['X', 'Y', 'Z'] satisfies Strategy[]).includes(option as Strategy)
}

const inputText = fs.readFileSync('./src/02/input.txt', 'utf-8').toString()

const lines = inputText.split('\n')

let score = 0

console.log(lines.map((line) => line.split(' ').length))

for (const line of lines) {
  const [play, strat] = line.split(' ')
  if (strat && isOption(strat)) {
    const strategy = Options[OptionMap[strat]]

    if (strategy.victory[0] === play) {
      score += strategy.score + 6
    } else if (strategy.draw[0] === play) {
      score += strategy.score + 3
    } else if (strategy.loss[0] === play) {
      score += strategy.score
    }
  }
}

console.log(score)
