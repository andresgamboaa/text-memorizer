import { Component, createEffect, createSignal } from "solid-js"
import { Word } from "../types"
import { toggleWord } from "../Store"

export const WordButton: Component<{word: Word, show: boolean, lineNumber:number, number:number}> = (props) => {
  const [showWord, setShowWord] = createSignal(false)
  const [showAlways, setShowAllways] = createSignal(props.show)

  createEffect(() => setShowAllways(props.show))
  const showing = () => showAlways() || showWord() || props.word.isMarked

  return (
    <button 
      class={
        'flex transition-all duration-75 text-lg p-1 px-2 rounded-md text-nowrap' +
        (props.word.isMarked? ' bg-amber-400 hover:bg-amber-400 font-bold text-black': ' hover:bg-indigo-900 hover:text-white')
      }
      onMouseOver={() => setShowWord(true)}
      onClick={() => toggleWord(props.lineNumber, props.number)}
      onMouseLeave={() => setShowWord(false)}>
      <span class={'flex ' }>
        <span>{props.word.content[0]}</span>
        <span>{showing()? props.word.content.slice(1) : props.word.content.slice(1).split("").map(_ => "_").join("")}</span>
      </span>
   </button>
  )
}