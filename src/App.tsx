import { For, Index, createEffect, createSignal } from 'solid-js'
import './App.css'
import { Component } from 'solid-js/types/server/rendering.js'
import { createStore } from 'solid-js/store'

const example = `if you have to sit for hours
staring at your computer screen
or hunched over your
typewriter
searching for words,
don't do it.
if you're doing it for money or
fame,
don't do it.
if you're doing it because you want
women in your bed,
don't do it.
if you have to sit there and
rewrite it again and again,
don't do it.
if it's hard work just thinking about doing it,
don't do it.
if you're trying to write like somebody
else,
forget about it.

if you have to wait for it to roar out of
you,
then wait patiently.
if it never does roar out of you,
do something else.`

interface Word {
  content: string,
  isMarked: boolean
}

type Line = Word[]

const [lines, setLines] = createStore<Line[]>([])

const toggleWord = (lineIndex:number, wordIndex: number) => {
  setLines(
    lines.map((line, i) => lineIndex !== i? line : 
        line.map((word, j) => wordIndex != j? word: {...word, isMarked:!word.isMarked})
    )
  )
}

const unmarkAllWords = () => {
  setLines(
    lines.map((line) => line.map((word) => {
      return {...word, isMarked: false}
    }))
  )
}

function App() {
  const [text, setText] = createSignal(example)
  const [showAll, setShowAll] = createSignal(false)

  createEffect(() => setLines(
    text()
      .split("\n").filter((line) => line) // Get lines
      .map((line) => line.split(" ").filter((word) => word)) // Separate words
      .map((line) => line.map((word) => {return {content:word, isMarked:false}})) // Format
  ))

  return (
    <div class='w-full h-full p-4 bg-zinc-900'>
      <div class=''>
        <textarea class='' 
          value={text()} 
          onInput={(t) => {
            setText(t.target.value)
          }}
        ></textarea>
      </div>

     <button onClick={() => setShowAll(!showAll())}>{showAll()? 'hide': 'show'}</button>
     <button onClick={() => unmarkAllWords()}>Unmark</button>

      <div class='w-fit mx-auto monoscape shadow-md shadow-black p-6 select-none'>
        <Index each={lines}>{ (line, i) => 
          <Line number={i} data={line()} show={showAll()}/>}
        </Index>
      </div>

   </div>
  )
}

const Line: Component<{data: Line, show: boolean, number:number}> = (props) => {
  const [show, setShow] = createSignal(props.show)
  const [showAlways, setShowAlways] = createSignal(false)

  createEffect(() => setShowAlways(props.show))

  return (
    <div class='flex mb-2'>
      <button
        onMouseOver={() => setShow(true)} 
        onClick={() => setShowAlways(!showAlways())} 
        onmouseleave={() => setShow(false)} 
        class='bg-zinc-700 m-0 mr-2'>hover</button>
      <div class='flex gap-1'>
        <Index each={props.data}>{(word, i) =>
          <Button 
            lineNumber={props.number} 
            number={i} 
            word={word()} 
            show={show() || showAlways()}
          />
        }</Index> 
      </div>
    </div>
  )
}

const Button: Component<{word: Word, show: boolean, lineNumber:number, number:number}> = (props) => {
  const [showWord, setShowWord] = createSignal(false)
  const [showAlways, setShowAllways] = createSignal(props.show)

  createEffect(() => setShowAllways(props.show))
  const showing = () => showAlways() || showWord() || props.word.isMarked

  return (
    <button 
      class={
        'flex transition-all duration-75 text-2xl p-1 px-2 rounded-md ' +
        (props.word.isMarked? ' bg-amber-400 hover:bg-amber-400 font-bold text-black': 'hover:bg-indigo-900')
      }
      onMouseOver={() => setShowWord(true)}
      onClick={() => toggleWord(props.lineNumber, props.number)}
      onMouseLeave={() => setShowWord(false)}>
      <span class={'flex ' }>
        <p>{props.word.content[0]}</p>
        <p>{showing()? props.word.content.slice(1) : props.word.content.slice(1).split("").map(_ => "_").join("")}</p>
      </span>
   </button>
  )
}

export default App