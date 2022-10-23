import data from "../data.json"

export const firmsListModel = {
    // state: data.winstrom.adresar.filter(item => item.psc.length > 0),
    state: [],
    // state: {},
    reducers: {
        setFirms(state, firms) {
            // console.log('firms', firms)
            return {...firms }
        },
        filter(state, num) {
            let filteredFirms = [...state];
            // filteredFirms = filteredFirms.winstrom.adresar.filter((firm) => firm.psc.startsWith(num))
            if (num === "") {
                filteredFirms = filteredFirms.filter((firm) => parseInt(firm.psc[0]) > 4)
            }
            filteredFirms = filteredFirms.filter((firm) => firm.psc.startsWith(num))

            return filteredFirms
        },
        setInitialState(state) {
            let initialState = data.winstrom.adresar.filter(item => item.psc.length > 0)
            return initialState
        },

    },
    effects: {
        async loadFirms() {
            const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar.json`);
            const data = await response.json();
            console.log('data', data)
            this.setFirms(data);
        },
    },
}