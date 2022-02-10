




//
export function mapEachInterfaces(adapters, action) {
    return Object.entries(adapters).map(([a_name, a_obj]) => {
        return Object.entries(a_obj).map(([i_name, i_obj]) => {
            return action(a_name, a_obj, i_name, i_obj)
        })
    })
}


//
export function forEachInterfaces(adapters, action) {
    for (const [a_name, a_obj] of Object.entries(adapters)) {
        for (const [i_name, i_obj] of Object.entries(a_obj)) {
            action(a_name, a_obj, i_name, i_obj)
        }
    }
}

