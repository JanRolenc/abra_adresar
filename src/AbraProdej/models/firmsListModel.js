import data from "../data.json"

let polePSC = data.winstrom.adresar.filter((firm) => firm.psc !== "").map(item => item.psc)
let upravenaPSC = polePSC.map((item) => item.split(" ").join(""))
let sortedPSC = upravenaPSC.sort()
console.log('sortedPSC', sortedPSC)

let numberOfKohorts = 4;
let numberOfFirms = sortedPSC.length;
let numberOfPSCinKohort = Math.ceil(numberOfFirms / numberOfKohorts);

var kohorts = makeKohorts(sortedPSC, numberOfKohorts)

function makeKohorts(arr, numKoh) {
    var kohorty = []
    var polePSC = arr
    var num = 0;
    for (var i = 1; i <= numKoh; i++) {
        let valueArray = [];
        for (var y = 0; y < numberOfPSCinKohort; y++) {
            valueArray.push(polePSC[num + y])
        }
        kohorty = [...kohorty, {
            ['kohorta_' + i]: valueArray
        }];
        console.log("kohorty", kohorty)
        num += 4;
    }
    return kohorty
}

export const firmsListModel = {
    state: {
        firms: [],
        kohorts: []
    },
    // state: [],
    // state: {},
    reducers: {
        // setFirms(state, firms) {
        //     return {...firms }
        // },
        // setKohorts(state, kohorts) {
        //     return {...kohorts }
        // },
        filter(state, string) {
            let filteredFirms = [...state.firms];
            let selectedKohort = state.kohorts.filter(item => Object.keys(item) == string)
            filteredFirms = filteredFirms.filter((firm) => selectedKohort[0][string].includes(firm.psc.split(" ").join("")))
            console.log('filteredFirms', filteredFirms)

            return {...state, firms: filteredFirms }
        },
        setInitialState(state) {
            let initialStateFirms = data.winstrom.adresar.filter(item => item.psc.length > 0)
            let initialStateKohorts = makeKohorts(sortedPSC, numberOfKohorts)
            return {...state, firms: initialStateFirms, kohorts: initialStateKohorts }
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