import { useState } from 'react'
import Hiper_text from '../components/Hyper_text'
import text from '../the_little_prince.json'
import dict from '../wiki_data_trans.json'
import lemmas from '../lemmas.json'

const texts_db = [text]
const readed = [[0, 3], [0, 4]]
// const Text_library = ({ text }) => {
const Text_library = () => {
    const [search, set_search_tern] = useState('I') // set_search BACKEND
    const [chapter, set_chapter] = useState(3)
    const [show_dict, set_show_dict] = useState(false)
    const [ipa, set_ipa] = useState()

    function set_search(term) {
        const lemma = lemmas[term]
        set_search_tern(lemma)
        dict[lemma] ? dict[lemma]['pronunciation']['US'] ? set_ipa(dict[lemma]['pronunciation']['US'].split(',')[0])
            : dict[lemma]['pronunciation']['IPA'] ? set_ipa(dict[lemma]['pronunciation']['IPA'].split(',')[0])
                :
                set_ipa('')
            :
            set_ipa('')
    }

    const Occurrences = ({ term, readed }) => (
        <>
            {
                readed.reduce((acc, [t, c], i) => {
                    const text = texts_db[t].chapters[c]
                    if (text['words_map'][term]) {
                        const { verses, lines } = text['words_map'][term]
                        verses && acc.push(
                            <div key={i}>
                                <div className='pl-0 mb-3 text-right text-blue-400 uppercase'>{text.title}</div>
                                {verses.map((p, i) => (
                                    <div key={i} className='mb-2 hover:text-blue-400'>
                                        {text['nested'][p][lines[i]]}
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    return acc
                }, [])}
        </>
    )

    const Dict = ({ term }) => (
        <>
            {
                term in dict && dict[term]['meanings'] &&
                dict[term]['meanings'].map((m, i) => (
                    <div key={i}>
                        <div className='text-right text-blue-400 uppercase'>
                            {m['class']}
                        </div>
                        <div >
                            {
                                m['examples'].map((e, i) => (
                                    <div key={i} className='mb-2 text-neutral-800 hover:text-blue-400'>
                                        <p>
                                            {e}
                                        </p>
                                        <p className=' text-slate-400'>
                                            {m['ejemplos'] && m['ejemplos'][i]}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )

    return (
        <div className='flex flex-col h-screen bg-stone-100'>
            <div className='flex justify-between p-4 '>
                <h2>Stories</h2>
                {/* <h3>Pomodoro</h3> */}
            </div>
            <main className='flex justify-center overflow-hidden containier grow'>
                <article className='w-2/3 overflow-y-auto border border-slate-400'>
                    <header className='sticky top-0 z-10 flex items-center justify-between h-12 bg-slate-400'>
                        <h3 className='capitalize'>{text.title}</h3>
                        <div className='flex gap-2 mr-10'>
                            <button onClick={() => set_chapter(chapter - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button onClick={() => set_chapter(chapter + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </header>
                    <section className='px-10 text-lg text-justify pb-96'>
                        <h3 className="mb-4 text-blue-400 uppercase">{text.chapters[chapter].title}</h3>
                        <Hiper_text paragraphs={text.chapters[chapter].nested} search={search} set_search={set_search} />
                    </section>
                </article>
                <aside className='w-1/3 overflow-y-auto border border-slate-400'>
                    <header className='sticky top-0 flex items-center justify-between h-12 pl-4 pr-6 bg-slate-400'>
                        <span className='flex gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" className='w-1/2 h-6 px-3 rounded outline-none bg-stone-100' />
                        </span>
                        {/* <button className='text-lg btn min-w-fit'>Class Notes</button> */}
                    </header>
                    <section className='text-base'>
                        <header className='sticky flex items-baseline justify-between pr-5 bg-stone-100 top-12'>
                            <div>
                                <h3 className="inline-block text-red-900 capitalize">{search}</h3>
                                <span>{ipa}</span>
                            </div>
                            <div className='flex gap-2'>
                                <button className='btn' onClick={() => set_show_dict(false)}>Occurrences</button>
                                <button className='btn' onClick={() => set_show_dict(true)}>Dictionary</button>
                            </div>
                        </header>
                        <div className='px-8 pt-5 pb-52'>
                            {
                                show_dict ? <Dict term={search} />
                                    :
                                    <Occurrences term={search} readed={readed} />
                            }
                        </div>
                    </section>
                </aside>
            </main>
            {/* <footer className='flex items-center w-screen p-4 text-center justify-evenly bg-slate-400'> contact us</footer> */}
        </div>
    )



}

export default Text_library