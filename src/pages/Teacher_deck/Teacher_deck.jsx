import { Outlet, Link } from "react-router-dom";


const Teacher_deck = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl font-bold mt-52 mr-52">
      <Home />
      <Outlet />
    </div >
  )

}

function Home() {
  return (
    <>
      <div className="absolute flex flex-col items-center justify-center w-full h-full gap-5 text-lg font-bold ">
        <Link to='/teacher/deck'>Deck</Link>
        <Link to='/teacher/editor'>Edit</Link>
      </div>
    </>
  )
}

export default Teacher_deck;
