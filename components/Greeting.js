import { useContext } from "react";
import { UserContext } from "../pages/context/userContext";

export default function Greeting(greet) {
    const userContext = useContext(UserContext)

    let newDate = new Date()
    let time = newDate.getHours()
    let date = newDate.getDate()
    let month = newDate.toLocaleString('default', { month: 'long' })
    let year = newDate.getFullYear()

    if (time < 12)
        greet = 'morning';
    else if (time >= 12 && time <= 17)
        greet = 'afternoon';
    else if (time >= 17 && time <= 22)
        greet = 'evening';
    else if (time >= 22 && time <= 24)
        greet = 'night';

    return (
        <>
            {/* greeting main*/}
            <div className="grid grid-cols-4 gap-5 mb-5">
                {/* greeting */}
                <div className="bg-white rounded-xl col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2 flex justify-between">
                    <div className="p-5">
                        <h1 className="text-2xl font-extralight mb-5">Good {greet}, {userContext.user.username}!</h1>
                        <p className="text-md text-gray-500 font-extralight">Udah sampe mana ya bosku garapannya?</p>
                        <p className="text-md text-gray-500 font-extralight">Yuk bisa yuk! 🔥🔥🔥🔥</p>
                    </div>
                    <img src="/img/headline.png" alt=""></img>
                </div>
                {/* calendar */}
                <div className="col-span-1">
                    <div className="bg-white w-full hidden md:grid grid-cols-1 gap-4 place-items-center rounded-xl p-5 grid">
                        <h1 className="text-2xl font-extralight">TODAY</h1>
                        <h1 className="text-6xl font-extralight text-amber-600">{date}</h1>
                        <h1 className="text-md font-extralight uppercase">{month} {year}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}