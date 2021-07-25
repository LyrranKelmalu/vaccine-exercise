<template>
    <v-app>
        <div>
            <v-card
            class="application_table"
            elevation="7"
            outlined
            tile
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Order id:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.id}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Order number:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.orderNumber}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Responsible person:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.responsiblePerson}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Healthcare district:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.healthCareDistrict}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Vaccine name:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.vaccine}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Amount of injections:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.injections}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Arriving date:</v-list-item-title>
                         <v-list-item-subtitle>{{singleOrder.arrived}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
        <div>
            <v-card
            class="application_table mt-5"
            elevation="10"
            outlined
            tile
            >
                <div v-if="arrivedOrders == 0">
                    <h3>Fetching data</h3>
                    <v-progress-linear
                    indeterminate
                    color="primary"
                    ></v-progress-linear>
                </div>

                <v-expansion-panels class="m-5" :disabled="disabled" inset>
                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[0]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Orders arrived - {{arrivedOrders}} / Vaccines arrived - {{vaccinesArrived}}
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[1]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Vaccinations have been used: {{usedVaccines}}
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[2]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Antiqua orders - {{antiquaOrders}} | Antiqua vaccines - {{antiquaVaccines}} </p>
                            <p>SolarBuddhica orders - {{solarbuddhicaOrders}} | SolarBuddhica vaccines - {{solarbuddhicaVaccines}} </p>
                            <p>Zerpfy orders - {{zerpfyOrders}} | Zerpfy vaccines - {{zerpfyVaccines}} </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[3]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Injections expired on given day - {{expiredOnGivenDay}} </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[4]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Injections expired before the usage - {{injectionsExpiredBefore}} </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[5]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Injection left to use - {{injectionsLeftToUse}} </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>{{questions[6]}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Injections are going to expire in next 10 days - {{goingToExp}}</p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import {mapState} from 'vuex'

export default {
name: 'order',
    data: function () {
        return {
            disabled: true,
            arrivedOrders: 0,
            vaccinesArrived: 0,
            usedVaccines: 0,
            antiquaOrders: 0,
            antiquaVaccines: 0,
            solarbuddhicaOrders: 0,
            solarbuddhicaVaccines: 0,
            zerpfyOrders: 0,
            zerpfyVaccines: 0, 
            injectionsExpiredBefore: 0,
            injectionsLeftToUse: 0,
            expiredOnGivenDay: 0,
            goingToExp: 0,
            questions: [
                'How many orders and vaccines have arrived total?',
                'How many of the vaccinations have been used?',
                'How many orders/vaccines per producer?',
                'How many bottles have expired on the given day (remember a bottle expires 30 days after arrival)?',
                'How many vaccines expired before the usage -> remember to decrease used injections from the expired bottle',
                'How many vaccines are left to use?',
                'How many vaccines are going to expire in the next 10 days?'
            ],
        }
    },
    mounted () {
        //First programm fetch data, then run functions
        this.fetchData ().then(() =>{
            this.countUsedVaccines ()
            this.countProducers ()
            this.countExpiredBeforeUsage ()
            this.expOnGivenDay ()
        })
    },
    computed: {
        ...mapState ({
            singleOrder: state => state.singleOrder,
            vaccineOrders: state => state.vaccineOrders,
            vaccinations: state => state.vaccinations
        }),
        orderDate: function () {
            return new Date(this.singleOrder.arrived)
        }
    },
    methods: {
      async fetchData () {
        await this.$store.dispatch('findById', this.$route.fullPath),
        await this.$store.dispatch('fetchData'),
        await this.$store.dispatch('fetchVaccines')
        },

        //Count used vaccines
        countUsedVaccines () {
            for (let i = 0; i < this.vaccinations.length; i++) {
                let date = new Date(this.vaccinations[i].vaccinationDate)
                if (date < this.orderDate) {
                    this.usedVaccines++
                }
            }
        },

        //Count amount of arrived total orders/vaccines + per producer 
        countProducers () {
            for (let i = 0; i < this.vaccineOrders.length; i++) {
                let date = new Date(this.vaccineOrders[i].arrived)
                if (date < this.orderDate) {
                    this.arrivedOrders++
                    this.vaccinesArrived += this.vaccineOrders[i].injections

                    switch(this.vaccineOrders[i].vaccine) {
                    case 'Antiqua':
                        this.antiquaOrders++
                        this.antiquaVaccines += this.vaccineOrders[i].injections
                        break;
                    case 'SolarBuddhica':
                        this.solarbuddhicaOrders++
                        this.solarbuddhicaVaccines += this.vaccineOrders[i].injections
                        break;
                    case 'Zerpfy':
                        this.zerpfyOrders++
                        this.zerpfyVaccines += this.vaccineOrders[i].injections
                        break;
                    }
                }
            }
            this.disabled = false
        },
        //Count expired/left to use vaccines before that day
        countExpiredBeforeUsage () {
            const oneDay = (24 * 60 * 60 * 1000)
            const thirtyDaysExp = new Date(this.orderDate - (oneDay * 30))
            const twentyDays = new Date(this.orderDate - (oneDay * 20))
            let expInTenDays = 0
            let vaccinesInTenDays = 0
            let injectionsExpired = 0
            let injectionsUsed = 0
            let injUsedBeforeExp = 0
            let notExpiredVaccines = 0
            
            /* Loop 1 check and count arrived vaccines
                Loop 2 check and count used injections
                At the end of that function we decrease 
                Used injections from arrived vaccines
            */

            // 1) That loop count expired injections
            this.vaccineOrders.forEach(el => {
                let arrivedDate = new Date(el.arrived)
                //That IF count expired vaccines before given day
                if (arrivedDate < thirtyDaysExp) {
                    injectionsExpired += el.injections
                //That IF count expired vaccines in next 10 days
                } else if (arrivedDate < twentyDays) {
                            expInTenDays += el.injections
                //That IF count not expired vaccines
                } else if (arrivedDate > thirtyDaysExp
                        && arrivedDate < this.orderDate) {
                            notExpiredVaccines += el.injections
                }
            })
            // 2) That loop count used injections
            this.vaccinations.forEach(el => {
                let vaccinationDate = new Date(el.vaccinationDate)
                //That IF count used injection before given day
                if (vaccinationDate < thirtyDaysExp) {
                    injectionsUsed++
                //That IF count used vaccines in next 10 day
                } else if  (vaccinationDate < twentyDays) {
                            vaccinesInTenDays++
                /*
                That IF count used injections from arrived date
                to given day. That how we understand, how much
                injections we left to use.
                */
                } else if (vaccinationDate > thirtyDaysExp
                        && vaccinationDate < this.orderDate) {
                            injUsedBeforeExp++
                }
            })

            //That piece count amount of expired injections in next 10 days
            this.goingToExp = expInTenDays - vaccinesInTenDays

            //That piece count amount of expired injections before given date
            this.injectionsExpiredBefore = injectionsExpired - injectionsUsed

            //That piece count amount of injections left to use
            this.injectionsLeftToUse = notExpiredVaccines - injUsedBeforeExp
        },
        
        //Count how many bottles expired on the given date
        expOnGivenDay () {
            const thirtyDays = new Date(this.orderDate - (24 * 60 * 60 * 1000) * 30)
            const twentyNineDays = new Date(this.orderDate - (24 * 60 * 60 * 1000) * 29)
            let expired = 0
            let injectionsUsed = 0

            //amount of expired bottles before given date
            this.vaccineOrders.forEach(el => {
                let arrivedDate = new Date(el.arrived)
                if (arrivedDate < twentyNineDays
                    && arrivedDate > thirtyDays) {
                    expired += el.injections
                }
            })

            //amount of used injection on the given date
            this.vaccinations.forEach(el => {
                let injectionDate = new Date(el.vaccinationDate)
                if (injectionDate < twentyNineDays
                    && injectionDate > thirtyDays) {
                    injectionsUsed++
                    }
            })

            //Here we set counted amounts to results
            this.expiredOnGivenDay = expired - injectionsUsed
        }
    }
}
</script>

<style>

</style>