import { useState } from "react"

import Download_button from "../../components/Download_button"
import ownDict from "../../wiki_data_trans.json"
import Hiperword from "../../components/Hiperword"
import lemmas from "../../lemmas.json"

const phonetic_aids = {}
let index = 0
let current_aid = ''
const hidden = 0
const phoneme = 1
const accent = 2
const accent_phoneme = 3

const Phonetic_aids_editor = ({ words }) => {

    const [word, set_word] = useState('')
    const [phonetics, set_phonetics] = useState('')
    const [aids, set_aids] = useState([...word])
    const [aids_map, set_aids_map] = useState([...word].map(() => 0))
    const [current, set_current_term] = useState('')
    const [saved, set_saved] = useState(false)

    return (
        <div div className="flex flex-col items-center justify-center h-screen">
            <div className="px-5 pt-2 pb-1 m-4 box">
                <Hiperword word={word} phonetic_aids={aids} aids_map={aids_map} />
            </div>
            <div className="flex gap-5 m-3">
                <div>
                    <div className={`${saved && ' text-green-900'} flex gap-2`}>
                        {
                            word.split('').map((vowel, i) =>
                                <button key={i}
                                    onClick={() => update_phonetic_aids([...aids], [...aids_map], i)} >
                                    {vowel}
                                </button>
                            )
                        }
                    </div>
                    <div className="flex gap-2">
                        {
                            phonetics.split('').map((phoneme, i) =>
                                <button key={i}
                                    onClick={() => current_aid = current_aid + phoneme} >
                                    {phoneme}
                                </button>
                            )
                        }
                    </div>
                </div>
                <button className="text-red-700 "
                    onClick={() => current_aid = 'x'} >
                    X
                </button>
            </div>
            <div className="flex gap-5 px-5 py-3 box">
                <button className="btn active:text-blue-400 w-min"
                    onClick={() => get_next(index)}>
                    Next
                </button>
                <button className="btn active:text-blue-400 w-min"
                    onClick={() => save()}>
                    Save
                </button>
                <div className="btn active:text-blue-400 w-min">
                    <Download_button file={phonetic_aids} file_name='phonetic_aids.json'>
                        Download
                    </Download_button>
                </div>
            </div>
            <div className="m-10 text-red-900 opacity-70">{current}</div>
        </div>
    )

    function update_phonetic_aids(aids, map, i) {
        if (current_aid) {
            if (current_aid === "ˈ") {
                map[i] === hidden ? map[i] = accent
                    : map[i] === phoneme ? map[i] = accent_phoneme
                        : map[i] = map[i]
                set_aids_map(map)
                current_aid = ''
            } else {
                map[i] = phoneme
                aids[i] = current_aid
                set_aids_map(map)
                set_aids(aids)
                current_aid = ''
            }
        } else {
            aids[i] ? aids[i] = ''
                : aids[i] = word[i]
            map[i] = hidden
            set_aids_map(map)
            set_aids(aids)
        }
    }

    function get_next() {
        set_saved(false)
        let { phonetics, word } = get_phonetics(index)
        index++
        if (phonetics) {
            set_phonetics(phonetics)
            set_word(word)
            set_aids([...word])
            set_aids_map([...word].map(() => 0))
        }
        else {
            console.log('no phonetics avalible for: ', word)
            get_next(index)
        }
    }

    function get_phonetics(index) {
        if (index >= words.length) {
            return { phonetics: '--', word: '--FIN--' }
        }
        else {
            const word = words[index]
            set_current_term(word)
            let phonetics = ''
            let ipaDict = ''
            ownDict[word] && ownDict[word]['pronunciation'] ?
                ipaDict = ownDict[word]['pronunciation']
                :
                ownDict[lemmas[word]] && (ipaDict = ownDict[lemmas[word]]['pronunciation'])

            if (ipaDict) {
                'US' in ipaDict ? phonetics = ipaDict['US']
                    :
                    'IPA' in ipaDict ? phonetics = ipaDict['IPA']
                        :
                        'UK' in ipaDict && (phonetics = ipaDict['UK'])

                phonetics && (phonetics = phonetics.split(',')[0].replace(/[\/\[\]]/gi, ''))
            }

            return { phonetics, word }
        }
    }

    function save() {
        set_saved(true)
        phonetic_aids[word] = {}
        phonetic_aids[word]['aids'] = aids
        phonetic_aids[word]['map'] = aids_map
    }
}

export default Phonetic_aids_editor