import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [
    [
        `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`, 12]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`========
Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}
========
`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {

    let linesWithTwo = 0
    let linesWithThree = 0

    const lines = splitLines(input)
    for (const line of lines){
        const counts: {[key: string]: number} = {}
        for (let i = 0; i < line.length; i++){
            if(counts[line.charAt(i)] === undefined){
                counts[line.charAt(i)] = 0
            }
            counts[line.charAt(i)] += 1
        }

        let countedTwo = false
        let countedThree = false 
        for(const key in counts){
            if(counts[key] === 2 && !countedTwo){
                linesWithTwo++
                countedTwo = true 
            }

            if(counts[key] === 3 && !countedThree){
                linesWithThree++
                countedThree = true
            }
        }
    }


    return linesWithTwo * linesWithThree
}
