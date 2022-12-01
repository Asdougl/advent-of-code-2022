import fs from 'fs/promises'

const main = async () => {
  const data = await fs.readFile('./src/01/input.txt')

  const elves: number[] = []

  let elfIndex = 0
  let topElf = 0

  const lines = data.toString().split('\n')

  for (const line of lines) {
    const elf = elves[elfIndex]
    if (!isNaN(parseInt(line))) {
      elves[elfIndex] = elf ? elf + parseInt(line) : parseInt(line)
    } else {
      if (elf && elf > topElf) {
        topElf = elf
      }
      elfIndex++
    }
  }

  console.log(topElf)
}

main()
