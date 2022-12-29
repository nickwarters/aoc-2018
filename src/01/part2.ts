import { readFileSync } from 'fs'
import path from 'path'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [
    [`+1\n-2\n+3\n+1`, 2], 
    [`+1\n-1`, 0],
    [`+3\n+3\n+4\n-2\n-4`, 10],
    [`-6\n+3\n+8\n+5\n-6`, 5],
    [`+7\n+7\n-2\n-7\n-4`, 14]
]

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
    const seen = new Set([retVal])

    mainLoop:
    while(true){

        const lines = splitLines(input)
        for(const line of lines) {
            retVal = eval(`${retVal}${line}`)

            if(seen.has(retVal)){
                break mainLoop
            }

            seen.add(retVal)
        }
    }

    return retVal
}
