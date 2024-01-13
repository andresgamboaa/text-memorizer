import { createStore } from 'solid-js/store'
import { Line } from './types'

const [store, setStore] = createStore<Line[]>([])

export const lines = store
export const setLines = setStore

export const toggleWord = (lineIndex:number, wordIndex: number) => {
  setStore(
    lines.map((line, i) => lineIndex !== i? line : 
        line.map((word, j) => wordIndex != j? word: {...word, isMarked:!word.isMarked})
    )
  )
}

export const unmarkAllWords = () => {
  setStore(
    lines.map((line) => line.map((word) => {
      return {...word, isMarked: false}
    }))
  )
}