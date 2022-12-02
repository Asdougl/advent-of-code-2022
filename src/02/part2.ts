import fs from 'fs'

type Playable = 'A' | 'B' | 'C'
type Strategy = 'X' | 'Y' | 'Z'

type Option = {
  name: string
  score: number
  victory: Playable
  draw: Playable
  loss: Playable
}

const Options = {
  ROCK: {
    name: 'ROCK',
    score: 1,
    victory: 'C',
    draw: 'A',
    loss: 'B',
  },
  PAPER: {
    name: 'PAPER',
    score: 2,
    victory: 'A',
    draw: 'B',
    loss: 'C',
  },
  SCISSORS: {
    name: 'SCISSORS',
    score: 3,
    victory: 'B',
    draw: 'C',
    loss: 'A',
  },
} satisfies Record<string, Option>

const OptionMap: Record<Playable, keyof typeof Options> = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
}

const isOption = (option: unknown): option is Playable => {
  return (['A', 'B', 'C'] satisfies Playable[]).includes(option as Playable)
}

const inputText = fs.readFileSync('./src/02/input.txt', 'utf-8').toString()
// const inputText = `A Y\nB X\nC Z`

const lines = inputText.split('\n')

let score = 0

for (const line of lines) {
  const [play, strat] = line.split(' ')
  if (play && isOption(play)) {
    let change = 0
    if (strat === 'X') {
      // need to lose
      const losing = Options[OptionMap[play]].victory
      const optionScore = Options[OptionMap[losing]].score
      change = optionScore
    } else if (strat === 'Y') {
      // need to draw
      const drawing = Options[OptionMap[play]].draw
      const optionScore = Options[OptionMap[drawing]].score
      change = optionScore + 3
    } else if (strat === 'Z') {
      // need to win
      const winning = Options[OptionMap[play]].loss
      const optionScore = Options[OptionMap[winning]].score
      change = optionScore + 6
    }
    score += change
  }
}

console.log(score)
