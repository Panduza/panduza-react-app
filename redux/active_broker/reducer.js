//
// Initial State Model
//
const initialState = {
    //  name
    //  enable
    //  url
    //  port
    //  username
    //  password
}

//
// Use the initialState as a default value
//
export default function activeBrokerReducer(state = initialState, action) {

    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "active_broker/set":
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

        default:
            // Do something here based on the different types of actions
            {
                // If this reducer doesn't recognize the action type, or doesn't
                // care about this specific action, return the existing state unchanged
                return state
            }

    }
}

