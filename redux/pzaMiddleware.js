import Mqtt from 'mqtt';
import { getStoredBrokers } from '@/libs/brokers'

/**
 * Store mqtt clients to scan interfaces
 */
var MqttClients = []

/**
 *  
 */
const pzaMiddleware = ({ dispatch, getState }) => next => action => {

  switch (action.type) {

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    case "connections/restore":
      // To restore connections saved in the localstorage
      {
        // Fetch list of connections from localStorage
        let connections = getStoredBrokers()

        // Trigger scan
        dispatch({ type: "connections/set", connections: connections })
        dispatch({ type: "interfaces/scan" })
        break;
      }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    case "connections/add":
      // To append a connection on the user list and trigger a loading
      {
        // Fetch list of connections from localStorage
        let connections = getStoredBrokers()

        // Append the new connection
        connections.push({ name: "new connection" })

        // Save the new list back in localstorage
        localStorage.setItem("pza.connections", JSON.stringify(connections))

        // Trigger scan
        dispatch({ type: "connections/set", connections: connections })
        dispatch({ type: "interfaces/scan" })
        break;
      }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    case "connections/delete":
      {
        // Fetch list of connections from localStorage
        let connections = getStoredBrokers()

        // Append the new connection
        connections.splice(action.index, 1)

        // Save the new list back in localstorage
        localStorage.setItem("pza.connections", JSON.stringify(connections))

        // Trigger scan
        dispatch({ type: "connections/set", connections: connections })
        dispatch({ type: "interfaces/scan" })
        break;
      }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    case "connections/update":
      // To update connection data
      {
        // Fetch list of connections from localStorage
        let connections = getStoredBrokers()

        // Append the new connection
        connections[action.index] = action.connection

        // Save the new list back in localstorage
        localStorage.setItem("pza.connections", JSON.stringify(connections))

        // Trigger scan
        dispatch({ type: "connections/set", connections: connections })
        dispatch({ type: "interfaces/scan" })
        break;
      }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    case "interfaces/scan":
      // Reset all the connection scan and restart them
      {
        // Fetch list of connections from localStorage
        let connections = getStoredBrokers()

        //
        dispatch({ type: 'interfaces/reset' })
        
        // 
        MqttClients.forEach((client) => {
          client.end();
        })
        MqttClients=[]

        //
        connections.forEach((co) => {
          // Generate the connection url
          const conn_url = "ws://" + co.url + ":" + co.port

          // Start connection
          let mqtt_client = Mqtt.connect(conn_url, {
            reconnectPeriod: 10000
          })

          // Action on connection
          // Subscribe to all interface infos topics (to scan the broker)
          mqtt_client.on('connect', () => {
            mqtt_client.subscribe('pza/+/+/+/+/info')
            mqtt_client.subscribe('pza/+/+/+/info')
            mqtt_client.publish('pza','*')
            // dispatch({ type: 'co/connected', co: { name: action.co.name } })
          })

          // Manage message reception
          mqtt_client.on('message', (topic, message) => {

            // Parse interface info (scan process)
            if (topic.endsWith('/info')) {
              let message_string = new TextDecoder().decode(message)
              let message_object = JSON.parse(message_string)
              dispatch({
                type: 'interfaces/add',
                interface: {
                  co: co,
                  base_topic: topic.slice(0, -5),
                  ...message_object
                }
              })
            }

          })

          //
          MqttClients.push(mqtt_client)
        });

        break;
      }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

  };
  return next(action);
};

export default pzaMiddleware;
