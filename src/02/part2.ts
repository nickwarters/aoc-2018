import { readFileSync } from 'fs'
import { splitLines } from '../utils/helpers.js'

const tests: [string, any][] = [
    [`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`, 'fgij']
    ]

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

function solve(input: string): string {

    let retVal = ''
    const correctLines = new Set()
    const seen = new Set()

    const lines = splitLines(input)

    mainLoop:
    for (const l1 of lines){
        for (const l2 of lines) {
            if(l1 === l2) { continue }
            
            let wrongChars = 0
            let correctChars = ''

            for(let i = 0; i < l1.length; i++){
                if(wrongChars === 2){ break }

                if(l1.charAt(i) !== l2.charAt(i)){
                    wrongChars++
                } else {
                    correctChars = `${correctChars}${l1.charAt(i)}`
                }
            }

            if(wrongChars === 1){
                retVal = correctChars
                break mainLoop
            }

        }
    }


    
    return retVal
}
