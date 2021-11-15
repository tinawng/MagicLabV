export const state = () => ({
    api_port: undefined,
})

export const mutations = {
    setApiPort(state, api_port) {
        state.api_port = api_port;
    },
}

export const actions = {
}

export const getters = {
    api_port: (state) => {
        return state.api_port;
    },
}