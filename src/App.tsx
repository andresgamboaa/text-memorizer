import { Index, Show, createEffect, createSignal } from 'solid-js'
import { lines, setLines, unmarkAllWords } from './Store'
import { LineView } from './components/Line'
import { ToggleThemeButton } from './components/ToggleThemeButton'
import githubImg from './assets/github.png'

function App() {
  const [text, setText] = createSignal('')
  const [showAll, setShowAll] = createSignal(false)
  const [highlightCurrentLine, setHighlightCurrentLine] = createSignal(false)

  createEffect(() => setLines(
    text().trim()
      .split("\n").filter((line) => line) // Get lines
      .map((line) => line.split(" ").filter((word) => word)) // Separate words
      .map((line) => line.map((word) => ({ content: word, isMarked: false }))) // Format
  ))

  return (
    <div class='w-full h-full p-8 bg-zinc-100 dark:bg-zinc-900 overflow-x-hidden text-black dark:text-white fix-scroll'>
      <div class=' max-w-[980px] mx-auto relative '>
        <h1 class='text-4xl font-bold text-center mb-8'>Text-Memorizer</h1>

        <div class='w-full mb-8'>
          <textarea class='w-full border border-zinc-700 dark:border-none  dark:text-white/60 dark:focus:text-white bg-zinc-100 dark:bg-zinc-800/50 resize-none rounded-md transition-all h-[40px] overflow-hidden focus:overflow-auto focus:h-[200px] p-2'
            value={text()}
            onInput={(t) => {
              setText(t.target.value)
            }}
            onBlur={() => location.href = "#board"}
            placeholder='Text to memorize...'
          ></textarea>
        </div>

        <Show when={lines.length}>
          <div id='board' class='h-screen grid place-content-center'>
            <div class='w-full flex justify-center overflow-hidden '>
              <button class=' rounded-tl-sm border-t border-l border-r border-zinc-800 px-2 text-zinc-800 dark:text-zinc-400 bg-zinc-100 dark:bg-transparent' onClick={() => setShowAll(!showAll())}>{!showAll() ? 'hide' : 'show'}</button>
              <button class='  border-t border-l border-r border-zinc-800 px-2 text-zinc-800 dark:text-zinc-400 bg-zinc-100 dark:bg-transparent' onClick={() => unmarkAllWords()}>unmark</button>
              <button class=' rounded-tr-sm border-t border-l border-r border-zinc-800 px-2 text-zinc-800 dark:text-zinc-400 bg-zinc-100 dark:bg-transparent' onClick={() => setHighlightCurrentLine(!highlightCurrentLine())}>{!highlightCurrentLine()? 'highlight all': 'highlight current line'}</button>
            </div>
            <section class='w-full mx-auto bg-zinc-100 dark:bg-zinc-800/50 rounded-md  monoscape shadow-lg shadow-black/60 p-6 select-none overflow-auto'
              style={{height: '90vh'}}
            >
              <Index each={lines}>{(line, i) =>
                <LineView number={i} data={line()} show={showAll()} highlight={highlightCurrentLine()}/>}
              </Index>
            </section>
          </div>
        </Show>
        
        <section>
          <h2 class='mt-8 text-3xl bold mb-4'>About</h2>
          <p class='text-lg mb-8'>This tool is designed to enhance your ability to memorize various forms of text, such as lines from scripts, poems, speeches, and monologues.</p>
        </section>

        <section class='mt-8'>
          <h2 class='text-3xl bold mb-4'>Instructions</h2>
          <ul class='list-disc ml-4'>
            <li>Use the first character of every word as a clue.</li>
            <li>Hover your mouse over the text to reveal words.</li>
            <li>Click on difficult words to keep them visible.</li>
          </ul>
        </section>

        <a class='flex gap-2 w-fit hover:underline hover:text-indigo-700 mt-8 mb-4' 
          target='_blank' href='https://github.com/andresgamboaa/text-memorizer'>
          <span class='rounded-full bg-zinc-900 grid place-content-center p-1'>
            <img src={githubImg} width={20}></img>
          </span>
          View Code
        </a>

        <ToggleThemeButton />

        <span class='fixed bottom-1 right-1 opacity-70  text-xs '>Created by: Andrés Gamboa A.</span>
      </div>
    </div>
  )
}

export default App
