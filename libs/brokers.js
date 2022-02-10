import { object } from "underscore"

var storage_item_name = "pza.brokers"

/**
 * 
 * @param {*} brokers 
 */
export function storeBrokers(brokers) {
    localStorage.setItem(storage_item_name, JSON.stringify(brokers))
}

/**
 * Fetch list of brokers from localStorage
 * @returns {}
 */
export function getStoredBrokers() {
    let brokers_object = {}
    try {
        brokers_object = localStorage.getItem(storage_item_name)
        // console.log("before parsing", brokers_object)
        brokers_object = JSON.parse(brokers_object)
        // console.log("after parsing", brokers_object)
        if (brokers_object === null || brokers_object === undefined || typeof brokers_object !== "object") {
            // console.log("error parsing internal data", brokers_object)
            brokers_object = {}
        }
    } catch (error) {
        // console.log("exception data", brokers_object, error)
        brokers_object = {}
    }
    // console.log("at the end", brokers_object)
    return brokers_object
}

/**
 * Turn brokers array into data for the combobox
 * @param {*} brokers_object
 * @returns 
 */
export function brokersDataToComboBoxData(brokers_object) {
    let cbox_data = []
    Object.keys(brokers_object).forEach(function (name, index) {
        cbox_data.push({
            label: name,
            index: index
        })
    })
    return cbox_data
}

/**
 * 
 * @param {*} brokers_object 
 */
export function generateNewAvailableName(brokers_object) {
    let id = 2
    let candidate = "New Broker"
    while (Object.keys(brokers_object).indexOf(candidate) != -1) {
        candidate = "New Broker " + id
        id++
    }
    return candidate
}

