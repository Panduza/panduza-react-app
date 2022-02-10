//
// Initial State Model
//
const initialState = {

    // Connections array
    connections: [
        //      {
        //          name
        //          enable
        //          url
        //          port
        //          username
        //          password
        //      } [...]
    ],

    // List of interfaces
    interfaces: [
        //      {
        //          co: 
        //          base_topic: "",
        //          info: { type, version }
        //      } [...]
    ],

    // List of workspaces
    workspaces: [
        //      {
        //      } [...]
    ]

}

//
// Use the initialState as a default value
//
export default function pzaReducer(state = initialState, action) {

    // Debug log
    console.log("REDUCE servers / state:", state, "/ action:", action)

    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case "connections/set":
            // Set the connection list
            {
                return {
                    ...state,
                    connections: action.connections
                }
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case 'interfaces/reset':
            // When the interface has been loaded
            {
                return {
                    ...state,
                    interfaces: []
                }
            }

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        case 'interfaces/add':
            // When the interface has been loaded
            {
                return {
                    ...state,
                    interfaces: [
                        ...state.interfaces,
                        action.interface
                    ]
                }
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

