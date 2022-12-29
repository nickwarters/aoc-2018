import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`, 4]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let retVal = 0

    const lines = splitLines(input)

    const coords: { [key: string]: number } = {}

    for (const line of lines) {
        const [id, x, y, width, height] = line.match(/\d+/g)!.map(n => parseInt(n))

        for(let h = 0; h < height; h++){
            for(let w = 0; w < width; w++){
                const c = [x + w, y + h].toString()
                if(coords[c] === undefined){
                    coords[c] = 0
                }

                coords[c]++
            }
        }
    }

    retVal = Object.keys(coords).filter(c => coords[c] > 1).length

    return retVal
}
