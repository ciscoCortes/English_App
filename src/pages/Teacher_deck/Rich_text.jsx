import React, { useState } from "react";

import ownDict from "../../wiki_data_trans.json"

const level_words = ['go', 'this']

const Text_book = () => {
  const [promp, set_promp] = useState("");
  const [promp_color, set_promp_color] = useState('')
  return (
    <div className="relative h-full overflow-y-auto border rounded shadow-sm shadow-stone-401">
      <div className="sticky top-0 pb-2 bg-white">
        <div className={` w-40 h-10 p-2 font-bold ${promp_color} rounded-sm bg-stone-400`} >
          {promp}
        </div>
      </div>
      <div
        contentEditable={true}
        className='w-full p-5 outline-none'
        onInput={(evt) => { give_last_word(evt.target.innerText.split(' ')) }} >
      </div>
    </div>
  )

  function give_last_word(paragraphs) {
    if (paragraphs.length > 0) {
      const last_word = paragraphs[paragraphs.length - 1]
      level_words.includes(last_word) ?
        set_promp_color('text-green-900') :
        set_promp_color('text-red-900')
      set_promp(last_word)
    }
  }
}

const Rich_text = () => {
  const [word_type, set_word_type] = useState("verbs");
  const [suggested_words, set_suggested_words] = useState([]);
  const [fresh_list, set_fresh_list] = useState([])

  const Fresh_list = () => {
    return (
      <>
        {
          fresh_list.map(word => (
            <button
              key={word}
              onClick={() => set_fresh_list([...fresh_list.filter(w => w != word)])}
              className="capitalize hover:opacity-70" >
              {word}
            </button>
          ))
        }
      </>
    )
  }

  const Suggested_words = () => {
    return (
      <>
        <h3 className="sticky top-0 capitalize bg-white">{word_type}</h3>
        <div className="flex flex-wrap gap-2 px-5 pb-2">
          {suggested_words.map((word, i) => {
            return (
              <button
                key={i}
                className="w-32 p-1 text-left rounded shadow-sm shadow-stone-400 hover:text-stone-100 hover:bg-stone-400"
                onClick={() => {
                  fresh_list.length > 15
                    ? set_fresh_list([...fresh_list.slice(1, 16), word])
                    : set_fresh_list([...fresh_list, word]);
                }}
              >
                {word}
              </button>
            );
          })}
        </div>
      </>
    )
  }

  const Word_classes = () => {

    const classes = [
      'article',
      'preposition',
      'adverb',
      'adjective',
      'noun',
      'conjunction',
      'determiner',
      'pronoun',
      'verb',
      'proper noun',
      'numeral'
    ]
    return (
      <>
        {classes.map((word, i) => {
          return (
            <button
              className="capitalize btn"
              onClick={() => get_words_of_type(word, set_word_type, set_suggested_words)}
            >
              {word}
            </button>
          )
        })}
      </>
    )
    function get_words_of_type(pos) {
      set_word_type(pos + "s");
      const suggested_words = Object.keys(ownDict).reduce((result, word) => {
        ownDict[word].meanings &&
          (result = ownDict[word].meanings.reduce((matches, current) => {
            current.class == pos && matches.push(word);
            return matches;
          }, result))
        return result;
      }, []);
      set_suggested_words(suggested_words);
    }
  }

  return (
    <div className="h-screen">
      <main className="container flex flex-col h-screen px-10 pt-16 mx-auto">
        <header className="h-24">
          <h2
            contentEditable='true'
            className="text-center capitalize">
            book...
          </h2>
          <h3
            contentEditable='true'
            className="text-center uppercase text-slate-400">
            chapter...
          </h3>
        </header>
        <div className="h-3/5 " >
          <Text_book />
        </div>
        <div className="flex h-1/5 ">
          <div className="w-2/3 px-3 overflow-y-auto border">
            <Suggested_words />
          </div>
          <div className="grid items-start w-1/3 grid-cols-4 grid-rows-4 p-5 overflow-y-auto border">
            <Fresh_list />
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 flex items-center w-full text-lg h-14 bg-stone-400 justify-evenly">
        <Word_classes />
      </footer>
    </div >
  )
}


export default Rich_text;
