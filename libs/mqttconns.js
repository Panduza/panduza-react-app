import Mqtt from 'mqtt'


/**
 * Mqtt multiple connections manager
 * 
 * 
 * The 'conn' parameter is composed of { broker: broker_name, client: mqtt_client }
 */
export class MqttConns {

    /**
     * 
     */
    constructor() {
        this.brokers = null
        this.connections = []
        this.__on_connect_action = null
        this.__on_message_action = null
        this.__on_reconnect_action = null
        this.__on_close_action = null
        this.__on_offline_action = null
        this.__on_error_action = null
    }

    /**
     * 
     */
    setBrokers(brokers) {
        this.brokers = brokers
    }

    /**
     * 
     */
    start(connect_opts = { reconnectPeriod: 10000 }) {
        if (!this.brokers) return;

        for (const [broker_name, broker_data] of Object.entries(this.brokers)) {

            // Generate the connection url
            const conn_url = "ws://" + broker_data.url + ":" + broker_data.port

            // Debug
            console.log(conn_url)

            // Start connection
            let new_client = Mqtt.connect(conn_url, connect_opts)

            //
            let conn = { broker: broker_name, client: new_client }

            // Manage connection
            new_client.on('connect', (connack) => {
                if (this.__on_connect_action) {
                    this.__on_connect_action(connack, conn)
                }
            })

            // Manage message reception
            new_client.on('message', (topic, message) => {
                if (this.__on_message_action) {
                    this.__on_message_action(topic, message, conn)
                }
            })

            //
            new_client.on('reconnect', () => {
                if (this.__on_reconnect_action) {
                    this.__on_reconnect_action(conn)
                }
            })

            //
            new_client.on('close', () => {
                if (this.__on_close_action) {
                    this.__on_close_action(conn)
                }
            })

            //
            new_client.on('offline', () => {
                if (this.__on_offline_action) {
                    this.__on_offline_action(conn)
                }
            })

            //
            new_client.on('error', (error) => {
                if (this.__on_error_action) {
                    this.__on_error_action(error, conn)
                }
            })

            //
            this.connections.push(conn)
        }
    }

    /**
     * 
     */
    clear() {
        this.connections.forEach((co) => {
            co.client.end()
        })
        this.connections = []
    }

    /**
     * @param { (connack, conn) => {} } action : event callback
     */
    on_connect(action) {
        this.__on_connect_action = action
    }

    /**
     * 
     */
    on_message(action) {
        this.__on_message_action = action
    }

    /**
     * 
     */
    on_reconnect(action) {
        this.__on_reconnect_action = action
    }

    /**
     * 
     */
    on_close(action) {
        this.__on_close_action = action
    }

}

