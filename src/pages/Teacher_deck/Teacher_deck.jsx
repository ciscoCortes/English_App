import { Outlet, Link } from "react-router-dom";


const Teacher_deck = () => {
  return (
    <div className="">
      <Home />
      <Outlet />
    </div>
  )

}

function Home() {
  return (
    <>
      <div className="absolute flex gap-5 text-lg font-bold ">
        <Link to='/teacher/deck'>Deck</Link>
        <Link to='/teacher/editor'>Edit</Link>
      </div>
    </>
  )
}

export default Teacher_deck;
