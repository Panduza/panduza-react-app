//
import { storeBrokers, getStoredBrokers } from '@/libs/brokers'

//
// Initial State Model
//
const initialState = {
    //
    // Brokers array
    //
    //  "broker_name" : {
    //      enable
    //      url
    //      port
    //      username
    //      password
    //  } [...]
    //
}

//
// Use the initialState as a default value
//
export default function brokersReducer(state = initialState, action) {

    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "brokers/restore":
            // To restore brokers saved in the localstorage
            {
                // Fetch list of brokers from localStorage
                let brokers = getStoredBrokers()

                // debug
                // console.log("brokers... >", brokers)

                if( !brokers.hasOwnProperty('demo-broker') ) {
                    let new_obj = {
                        ...state,
                    }
                    new_obj['demo-broker'] = {
                        enable: true,
                        url: "192.168.1.1",
                        port: 9001,
                        username: "",
                        password: ""
                    }

                    return new_obj
                }
                
                // 
                return brokers
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "brokers/new":
            // Create a new broker to the list
            {
                let new_obj = {
                    ...state,
                }
                new_obj[action.name] = {
                    enable: true,
                    url: "localhost",
                    port: 1883,
                    username: "",
                    password: ""
                }

                // debug
                // console.log("brokers... >", new_obj)

                storeBrokers(new_obj)
                return new_obj
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "brokers/update":
            {
                let new_obj = { ...state }
                new_obj[action.name] = action.data

                // debug
                // console.log("update brokers... >", new_obj)

                storeBrokers(new_obj)
                return new_obj
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "brokers/rename":
            {
                let new_obj = { ...state }
                let data = new_obj[action.old_name]
                delete new_obj[action.old_name]
                new_obj[action.new_name] = data
                storeBrokers(new_obj)
                return new_obj
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "brokers/delete":
            {
                let new_obj = { ...state }
                delete new_obj[action.name]
                storeBrokers(new_obj)
                return new_obj
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        default:
            // Do something here based on the different types of actions
            {
                // If this reducer doesn't recognize the action type, or doesn't
                // care about this specific action, return the existing state unchanged
                return state
            }

    }
}

