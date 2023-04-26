import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";


const localizer = momentLocalizer(moment);

const BigCalendar = (props: any) => {

  const events = [
    {
      id: 0,
      title: "Board meeting",
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: "MS training",
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 10,
    },
    {
      id: 2,
      title: "Team lead meeting",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 11,
    },
    {
      id: 3,
      title: "Birthday Party",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 15,
    },
    {
      id: 4,
      title: "Birthday Party",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 16,
    },
    {
      id: 5,
      title: "Birthday Party",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 17,
    },
    {
      id: 6,
      title: "Birthday Party",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 18,
    },
    {
      id: 7,
      title: "Birthday Party",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 19,
    },
  ];

  const [eventList, setEventList]: any = useState(events);

  const DragAndDropCalendar = withDragAndDrop(Calendar as any);

  const tooltipAccessor = (event: any) => {
    return "";
  };


  
  useEffect(()=>{

    document.getElementsByClassName('rbc-time-content')[0].addEventListener('scroll', handleCalenderScroll);
    return () => {
        console.log('unmount');
        document.getElementsByClassName('rbc-time-content')[0].removeEventListener('scroll', handleCalenderScroll);
    };
   },[])


  useEffect(()=>{
    document.getElementsByClassName('rbc-time-content')[0].removeEventListener('scroll', handleCalenderScroll);
    document.getElementsByClassName('rbc-time-content')[0].addEventListener('scroll', handleCalenderScroll);
    setTimeout(()=>{handleAutoScroll()},1000) 
  },[eventList])

  useLayoutEffect(() => {
    handleAutoScroll();
  });

   const handleCalenderScroll=(event:any)=>{
    const scrolled = document.getElementsByClassName('rbc-time-content')[0].scrollLeft;
    localStorage.setItem('lastScrollPotion',scrolled.toString())
    console.log(scrolled);
   }

  const onEventDrop = ({ event, start, end, resourceId }: any) => {
    if (event?.resourceId === resourceId) {

      Promise.all([
          updateEvent(event, start, end),
        ]).then(() => {
           
      });
    } else {
    }
  };

  const updateEvent = (event: any, start: any, end: any) => {
    const idx = eventList.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...eventList];
    nextEvents.splice(idx, 1, updatedEvent);

    setEventList(nextEvents);
    
  };

  const resizeEvent = ({ event, start, end }: any) => {
    Promise.all([
        updateEvent(event, start, end)
      ]).then(() => {
       
        // handleAutoScroll();
    });
  };

  const resourceMap = [
    { resourceId: 1, resourceTitle: "Board room" },
    { resourceId: 2, resourceTitle: "Training room" },
    { resourceId: 3, resourceTitle: "Meeting room 1" },
    { resourceId: 4, resourceTitle: "Meeting room 2" },
    { resourceId: 5, resourceTitle: "Meeting room 3" },
    { resourceId: 6, resourceTitle: "Meeting room 4" },
    { resourceId: 7, resourceTitle: "Meeting room 5" },
    { resourceId: 8, resourceTitle: "Meeting room 6" },
    { resourceId: 9, resourceTitle: "Meeting room 7" },
    { resourceId: 10, resourceTitle: "Meeting room 8" },
    { resourceId: 11, resourceTitle: "Meeting room 9" },
    { resourceId: 12, resourceTitle: "Meeting room 10" },
    { resourceId: 13, resourceTitle: "Meeting room 11" },
    { resourceId: 14, resourceTitle: "Meeting room 14" },
    { resourceId: 15, resourceTitle: "Meeting room 15" },
    { resourceId: 16, resourceTitle: "Meeting room 16" },
    { resourceId: 17, resourceTitle: "Meeting room 17" },
    { resourceId: 18, resourceTitle: "Meeting room 18" },
    { resourceId: 19, resourceTitle: "Meeting room 19" },
    { resourceId: 10, resourceTitle: "Meeting room 20" },
    { resourceId: 21, resourceTitle: "Meeting room 21" },
    { resourceId: 22, resourceTitle: "Meeting room 22" },
    { resourceId: 23, resourceTitle: "Meeting room 23" },
    { resourceId: 24, resourceTitle: "Meeting room 24" },
  ];

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2018, 0, 29),
      views: ["day", "work_week"],
    }),
    []
  );

  const handleAutoScroll=()=>{
  
            let lastScrollPotion=localStorage.getItem('lastScrollPotion');
            let scrolledTo=lastScrollPotion?parseInt(lastScrollPotion):0;
            const elementHeader = document.getElementsByClassName('rbc-time-header')[0];
            const elementBody = document.getElementsByClassName('rbc-time-content')[0];
            elementHeader.scrollLeft=(scrolledTo);
            elementBody.scrollLeft=(scrolledTo);
            

  }


  const customEvent = (event: any) => {
   
    return <div key={Math.random()}   id={`event${event?.event?.id}`} data-item="true" >{event?.title}</div>;
  };

  
  const resourceHeader = (resourceHeader: any) => {
   
    return <div key={Math.random()}  id={`resourceHeader${resourceHeader?.resource?.resourceId}`} >{(resourceHeader?.label)}</div>;
  };

  const handleViewChange = (view:any) => {
   console.log('handleViewChange',view)
  };

  const renderCalender = () => {
    console.log("render");

    return (
      <DragAndDropCalendar
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        events={eventList}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={resizeEvent}
        resources={resourceMap}
        resourceIdAccessor={(projectList: any) => projectList.resourceId}
        resourceTitleAccessor={(projectList: any) => projectList.resourceTitle}
        selectable
        showMultiDayTimes={true}
        views={{ day: true }}
        step={60}
        dayLayoutAlgorithm="no-overlap"
        formats={{
          eventTimeRangeFormat: (
            { start, end },
            culture: any,
            localizer: any
          ) =>
            localizer.format(start, "HH:mm", culture) +
            " - " +
            localizer.format(end, "HH:mm", culture),
          timeGutterFormat: (date, culture: any, localizer: any) =>
            localizer.format(date, "HH:mm", culture),
        }}
        tooltipAccessor={tooltipAccessor}
        components={{
            event:customEvent,
            resourceHeader:resourceHeader,
          }}
        
      />
    );
  };

  return <div key={Math.random()}   className="mb-5 w-full h-full big-container">{renderCalender()}</div>;
};

export default BigCalendar;
