

/**
 *
 */
export function restoreBrokers() {
    return { type: "brokers/restore" }
}

/**
 * @param {string} new_name
 */
export function createNewBroker(new_name) {
    return { type: "brokers/new", name: new_name }
}

/**
 * 
 */
export function updateBroker(broker_name, data) {
    return { type: "brokers/update", name: broker_name, data: data }
}

/**
 * 
 */
export function renameBroker(old_name, new_name) {
    return { type: "brokers/rename", old_name: old_name, new_name: new_name }
}

/**
 * 
 */
export function deleteBroker(broker_name) {
    return { type: "brokers/delete", name: broker_name }
}

