import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setUrl } from '../../utils/helper'
import PageWithAuth from '../../components/providers/pageWithAuth'
import { Event } from "./createevent"

function DisplayEvents() {
    const [events, setEvents] = useState<Event[] | null>(null) 
    useEffect(() => {
        async function getEvents() {
            try {
                const respons = await axios.post(`${setUrl.mockSerever}/events/displayevents`)
                setEvents(respons.data.events)
            } catch(error) {

            }
        }
        getEvents()
    }, [])
    return <>
        <div>
            {events?.map(event => {
                return <div>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <p>{event.address}</p>
                    <p>{event.location}</p>
                    <p>{event.startEvent}</p>
                    <p>{event.endEvent}</p>
                </div>
            })}
        </div>
    </>
}

export default PageWithAuth(DisplayEvents)