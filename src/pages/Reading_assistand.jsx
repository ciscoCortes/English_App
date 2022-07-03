import { useState } from 'react'
import Hyper_text from '../components/Hyper_text'
import Dowload_button from '../components/Download_button'
import book from '../the_little_prince.json'
import chapter5_dict from '../chap5_dict.json'

const Reading_assistand = () => {
    const [text, set_text] = useState()
    const [search, set_search] = useState()


    return (
        <div className='flex flex-col p-16'>
            {/* <div className='flex flex-col m-5'>
                <h3 className='p-4 text-center capitalize'> Introduce you text</h3>
                <textarea
                    onInput={(e) => set_text(e.target.value)}
                    name="input_text"
                    className='p-5 outline-none resize-none h-96 box'>
                </textarea>
                <div className='m-3 btn'>
                    <Dowload_button file={text} file_name={'chapter_5_text.txt'} >
                        Save
                    </Dowload_button>
                </div>
            </div> */}
            <div className='m-5 px-28'>
                <h3 className='p-4 text-center capitalize'>Hyper text</h3>
                <div className='p-5 box'>
                    <Hyper_text paragraphs={book.chapters[5].nested} search={search} set_search={set_search} />
                </div>
            </div>
            <hr className='my-10 ' />
            <div className='m-5'>
                <h3 className='p-4 text-center capitalize'>Dictionary</h3>
                <div className='grid grid-cols-3 p-5 box '>
                    {
                        Object.keys(chapter5_dict).map((word, i) =>
                            <div className='capitalize '>
                                <span className='font-semibold '>{word + ': '} </span>
                                <span className='font-semibold text-slate-600'>{chapter5_dict[word]}</span>
                            </div>
                        )}
                </div>
            </div>

        </div>
    )
}

export default Reading_assistand