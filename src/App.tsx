import { Index, Show, createEffect, createSignal } from 'solid-js'
import { lines, setLines, unmarkAllWords } from './Store'
import { LineView } from './components/Line'
const exp = `How do you explain when things don't go as we assume?
Or better, how do you explain
when others are able to achieve things that seem to defy all of the assumptions?
For example:
Why is Apple so innovative?
Year after year, after year,
they're more innovative than all their competition.
And yet, they're just a computer company.
They're just like everyone else.
They have the same access to the same talent,
the same agencies,
the same consultants, the same media.
Then why is it that they seem to have something different?
Why is it that Martin Luther King led the Civil Rights Movement?
He wasn't the only man who suffered in pre-civil rights America,
and he certainly wasn't the only great orator of the day.
Why him?
And why is it that the Wright brothers
were able to figure out controlled, powered man flight
when there were certainly other teams
who were better qualified, better funded --
and they didn't achieve powered man flight,
and the Wright brothers beat them to it.
There's something else at play here.
About three and a half years ago, I made a discovery.
And this discovery profoundly changed my view on how I thought the world worked,
and it even profoundly changed the way in which I operate in it.
As it turns out, there's a pattern.
As it turns out, all the great inspiring leaders and organizations in the world,
whether it's Apple or Martin Luther King or the Wright brothers,
they all think, act and communicate the exact same way.
And it's the complete opposite to everyone else.
All I did was codify it,
and it's probably the world's simplest idea.
I call it the golden circle.`

function App() {
  const [text, setText] = createSignal('')
  const [showAll, setShowAll] = createSignal(false)

  createEffect(() => setLines(
    text().trim()
      .split("\n").filter((line) => line) // Get lines
      .map((line) => line.split(" ").filter((word) => word)) // Separate words
      .map((line) => line.map((word) => ({ content: word, isMarked: false }))) // Format
  ))

  return (
    <div class='w-full h-full p-8 bg-zinc-900 overflow-x-hidden '>
      <div class=' max-w-[980px] mx-auto'>

        <div class='w-full mb-8'>
          <textarea class='w-full text-white/60 focus:text-white bg-zinc-800/50 resize-none rounded-md transition-all h-[40px] overflow-hidden focus:overflow-auto focus:h-[200px] p-2'
            value={text()}
            onInput={(t) => {
              setText(t.target.value)
            }}
            onBlur={() => location.href = "#board"}
          ></textarea>
        </div>
        
        <Show when={lines.length}>
          <button onClick={() => setShowAll(!showAll())}>{showAll() ? 'hide' : 'show'}</button>
          <button onClick={() => unmarkAllWords()}>Unmark</button>
        </Show>
        <Show when={lines.length}>
          <div id='board' class='h-screen grid place-content-center'>
            <section class='sm:w-full mx-auto bg-zinc-800/50 rounded-sm  monoscape shadow-lg shadow-black/60 p-6 select-none overflow-auto'
              style={{height: '90vh'}}
            >
              <Index each={lines}>{(line, i) =>
                <LineView number={i} data={line()} show={showAll()} />}
              </Index>
            </section>
          </div>
        </Show>
       
        <h2 class='mt-8 text-3xl bold mb-4'>About</h2>
        <p class='text-lg'>This free, streamlined memorization tool can help you with lines, poems, speeches and monologues - basically anything that needs to be spoken.</p>
  
      </div>
    </div>
  )
}

export default App
