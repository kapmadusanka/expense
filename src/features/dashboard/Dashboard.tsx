import { Link } from "react-router-dom"
import BigCalendar from "../../components/bigCalendar/BigCalender"
import "react-big-calendar/lib/css/react-big-calendar.css";

const Dashboard = () => {

    const content = (
        <section className="main-container w-full h-full">
            <main className="w-full h-full flex flex-row">
               <div className="md:w-56 lg:w-56 h-full xs:w-20 bg-primary-400">
                   <div className="relative  h-full">
                        <div>1</div>
                        <div className="absolute bottom-3">2</div>
                   </div>
               </div>
               <div className="w-full h-full overflow-hidden"><BigCalendar /></div>               
            </main>
        </section>

    )
    return content
}
export default Dashboard