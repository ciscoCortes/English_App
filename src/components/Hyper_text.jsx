import { useState } from "react";
import Hiperword from "./Hiperword";

const Hyper_text = ({ paragraphs = [], set_search, search }) => {
    const [highlight, set_highlight] = useState('')
    paragraphs = paragraphs.map(p => p.reduce((acc, sentence) => [...acc, ' ', ...sentence], []))
    let count = 0
    return (
        // pendiente ligar singos de puntuación a sus palabras ligadas
        <>
            {paragraphs.map((p, pi) => {
                if (p.length == 0) {
                    return <br key={pi} />

                }
                count++
                return (
                    <div key={pi}>
                        <sup className="font-semibold text-purple-900 ">{count}</sup>
                        {
                            p.reduce((acc, word, i) => {
                                let lemma = ''
                                if (Array.isArray(word)) {
                                    lemma = word[1]
                                    word = word[0]
                                }
                                word.match(/\W/) ? acc.push(word)
                                    :
                                    acc.push(
                                        <Hiperword key={i} word={word}
                                            id={`${pi}-${i}`}
                                            highlight={highlight}
                                            set_highlight={set_highlight}
                                            search={search}
                                            set_search={set_search}
                                            lemma={lemma}
                                        />)
                                return acc
                            }, [])}
                    </div>
                )
            })}
        </>
    )
}

export default Hyper_text