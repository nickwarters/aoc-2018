import { readFileSync } from 'fs'
import path from 'path'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [
    [`+1\n-2\n+3\n+1`, 3], 
    [`+1\n+1\n+1`, 3],
    [`+1\n+1\n-2`, 0],
    [`-1\n-2\n-3`, -6]
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

    return splitLines(input).reduce((prev, current) => {
        return eval(`${prev}${current}`)
    }, 0)
}
