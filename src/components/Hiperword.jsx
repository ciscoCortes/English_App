import React from 'react'

import words from '../ph_aids.json'
import data from '../wiki_data_trans.json'
import lemmas from '../lemmas.json'

const Hiperword = ({ word = '', phonetic_aids, aids_map, search, set_search, id, highlight, set_highlight }) => {

    if (!phonetic_aids) {
        const entry = word.toLocaleLowerCase()
        if (words[entry]) {
            phonetic_aids = [...words[entry].aids]
            aids_map = [...words[entry].map]
        }
    }
    return (
        <div className="inline-block my-1">
            {phonetic_aids &&
                <sub className="flex justify-between">
                    {phonetic_aids.map((e, i) => {
                        switch (aids_map[i]) {
                            case 1:  //phoneme
                                let color = 'text-green-900'
                                e === 'x' && (color = 'text-red-900')
                                return (
                                    <span className={color} key={i}>{e}</span>
                                )
                            case 2:  //accent
                                return (
                                    <span key={i}>
                                        <span className='font-bold text-red-900 '>'</span>
                                        <span className='text-transparent' >{e}</span>
                                    </span>
                                )
                            case 3:  //accent + phoneme
                                return (
                                    <span key={i}>
                                        <span className='-mr-0.5 font-bold text-red-900'>'</span>
                                        <span className='text-green-900 '>{e}</span>
                                    </span>
                                )
                            default:
                                return (
                                    <span className='text-transparent' key={i}>{e}</span>
                                )
                        }
                    })
                    }
                </sub>
            }
            <button
                title={phonetic_aids}
                className={`font-light ${lemmas[search] && lemmas[search] === lemmas[word.toLocaleLowerCase()] && 'font-medium'} ${highlight === id && 'text-blue-400'}`}
                onClick={() => {
                    set_highlight(id)
                    set_search(word.toLocaleLowerCase())
                }}
            >
                {word}
            </button>
        </div>
    )
}

export default Hiperword