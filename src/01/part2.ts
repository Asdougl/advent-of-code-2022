import fs from 'fs/promises'

const main = async () => {
  const data = await fs.readFile('./src/01/input.txt')

  const elves: number[] = []

  let elfIndex = 0

  const lines = data.toString().split('\n')

  for (const line of lines) {
    const elf = elves[elfIndex]
    if (!isNaN(parseInt(line))) {
      elves[elfIndex] = elf ? elf + parseInt(line) : parseInt(line)
    } else {
      elfIndex++
    }
  }

  const [top, second, third] = elves.sort((a, b) => a - b).reverse()

  console.log((top || 0) + (second || 0) + (third || 0))
}

main()
