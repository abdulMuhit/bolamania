let spahome = Vue.component('spahome', {
    template: `
<div>
    <div class="nav-content teal lighten-1">
      <ul class="tabs tabs-transparent">
        <li class="tab pointer" @click="changeLigue(2014)">|  Spanish  | </li>
        <li class="tab pointer" @click="changeLigue(2015)">|  French  | </li>
        <li class="tab pointer" @click="changeLigue(2002)">|  Germany  | </li>
      </ul>
    </div>

<div class="container">
            <div class="card pad center">
              <div v-if="ligue">

              <div class="row">
                  <div class="col-12">
                    <h1 v-if="ligue.data.competition">{{ligue.data.competition.name}}</h1>
                  </div>
              </div>
              <div class="row">
                  <div class="col-6">
                    <h2 v-if="ligue.data.competition">{{ligue.data.competition.area.name}}</h2>
                  </div>
              </div>
              <div class="row">
                  <div class="col-6">
                    <h4 v-if="ligue.data.competition">last update: {{ ligue.data.competition.lastUpdated }}</h4>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12">
                    <h4>season: </h4>
                    <h6>start date {{ ligue.data.season.startDate }}</h6>
                    <h6>end date {{ ligue.data.season.endDate }}</h6>
                    <h4>Current Matchday: {{ ligue.data.season.currentMatchday }}</h4>
                  </div>
              </div>

                <table class="striped responsive-table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Team</th>
                      <th>P</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>Detail</th>
                      <th>Fixture</th>
                   </tr>
                  </thead>
                <tbody>
                  <tr v-for="(standing, key) in ligue.data.standings[0].table" :key=key>
                      <td>{{standing.position}}</td>
                      <td><img class="logoteam" :src="standing.team.crestUrl" :alt="standing.team.name" :title="standing.team.name" @error="imageHandling"></td>
                      <td>{{standing.points}}</td>
                      <td>{{standing.won}}</td>
                      <td>{{standing.draw}}</td>
                      <td>{{standing.lost}}</td>
                      <td><button class="btn" @click="detail(standing.team.id)">Detail</button></td>
                      <td><button class="btn" @click="fixture(standing.team.id)">Fixture</button></td>
                  </tr>
                </tbody>
              </table>

            </div>

        </div>

</div>

</div>

        `,
    name: "home",
    data() {
        return {
            someData: "SPAHOME HERE",
            ligue: null,
        }
    },
    computed: {},
    methods: {
        imageHandling(err){
            err.target.src = '../../img/favicon.ico';
        },
        changeLigue: function (ligue) {
            let that = this;
            let loaderOverlay = document.getElementById("loaderOverlay");
            loaderOverlay.classList.add("showLoader");

            instance.get(`/competitions/${ligue}/standings?standingType=HOME`)
                .then(result => {
                    that.ligue = result;
                    loaderOverlay.classList.remove("showLoader");

                }).catch(e => {
                M.toast({html: `Error connection `, classes: 'rounded'});
                loaderOverlay.classList.remove("showLoader");
            }).finally(x => {
                loaderOverlay.classList.remove("showLoader");
            })
        },
        fixture(team) {
            router.push({name: 'fixture', params: {id: team}})
        },
        detail(team) {
            router.push({name: 'team', params: {id: team}})
        }
    },
    mounted() {
        let that = this;
        let el = document.getElementsByClassName("tabs");
        let instance = M.Tabs.init(el);

        that.changeLigue(2014);
    },
    created() {
        //let that = this;
        //that.changeLigue(2014);

        //for ofline/mockup
        //that.ligue = ligaSpain;
    }
});
