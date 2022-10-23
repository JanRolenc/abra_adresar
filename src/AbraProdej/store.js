import data from "../data.json"

export const firmsModel = {
    state: data,
    reducers: {
        setFirms(state, firms) {
            return firms
        },
    },
    // effects: {
    //     async loadFirms() {
    //         const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar.json?limit=10&start=20`);
    //         const data = await response.json();
    //         this.setFirms(data);
    //     },
    // },
}