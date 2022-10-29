import data from "../data.json"


function makeKohorts(arr) {
    var polePSC = arr.filter((firm) => firm.psc !== "").map(item => item.psc)
    var upravenaPSC = polePSC.map((item) => item.split(" ").join(""))
    var sortedPSC = upravenaPSC.sort()
    console.log("sortedPSC", sortedPSC)
    var numberOfKohorts = 5; //tolik se jich obecne chce, ale dle poctu firem lze snizit
    var numberOfFirms = sortedPSC.length;
    if (numberOfFirms < numberOfKohorts) {
        numberOfKohorts = numberOfFirms
    }
    var numberOfPSCinKohortNormal = 0;
    var numberOfPSCinKohortLast = 0;
    if ((numberOfFirms % numberOfKohorts) === 0) {
        numberOfPSCinKohortNormal = numberOfFirms / numberOfKohorts
        numberOfPSCinKohortLast = numberOfPSCinKohortNormal
    } else {
        numberOfPSCinKohortNormal = Math.round(numberOfFirms / numberOfKohorts)
        numberOfPSCinKohortLast = numberOfFirms - numberOfPSCinKohortNormal * (numberOfKohorts - 1)
    }
    console.log('numberOfPSCinKohortNormal', numberOfPSCinKohortNormal)
    console.log('numberOfPSCinKohortLast', numberOfPSCinKohortLast)
    console.log('firm na vstupu v makeKohorts', arr)
    var kohorty = []
    var num = 0;
    //vytletime kohorty
    var counterOfKohorts = 0;
    for (let i = 1; i <= numberOfKohorts; i++) {
        let valueArray = [];
        //kohorty se plni cisly
        if (counterOfKohorts !== numberOfKohorts - 1) {
            for (let y = 0; y < numberOfPSCinKohortNormal; y++) {
                valueArray.push(sortedPSC[num + y])
            }
            kohorty = [...kohorty, {
                ['kohorta_' + i]: valueArray
            }];
        } else {
            for (let y = 0; y < numberOfPSCinKohortLast; y++) {
                valueArray.push(sortedPSC[num + y])
            }
            kohorty = [...kohorty, {
                ['kohorta_' + i]: valueArray
            }];
        }
        counterOfKohorts += 1;
        num += numberOfPSCinKohortNormal;

    }
    console.log("kohorty", kohorty)
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
        filter(state, kohortsName) {
            let filteredFirms = [...state.firms];
            let selectedKohort = state.kohorts.filter(item => Object.keys(item) == kohortsName)
            filteredFirms = filteredFirms.filter((firm) => selectedKohort[0][kohortsName].includes(firm.psc.split(" ").join("")))
            let changedKohorts = makeKohorts(filteredFirms)
            return {...state, firms: filteredFirms, kohorts: changedKohorts }
        },
        setInitialState(state) {
            let initialStateFirms = data.winstrom.adresar.filter(item => item.psc.length > 0)
            let initialStateKohorts = makeKohorts(initialStateFirms)
            return {...state, firms: initialStateFirms, kohorts: initialStateKohorts }
        },
    },
    effects: {
        async loadFirms() {
            const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar.json`);
            const data = await response.json();
            // console.log('data', data)
            this.setFirms(data);
        },
    },
}