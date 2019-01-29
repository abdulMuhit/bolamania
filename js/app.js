document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

let instance = axios.create({
    baseURL: 'https://api.football-data.org/v2',
    headers: {'X-Auth-Token': '7bcc8bb1478e43cb8e691bc135073f79'}
});

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: spahome
},
    {
        path: '/about',
        component: spaAbout
    },
    {
        path: '/team/:id',
        name: 'team',
        component: spaTeam
    },
    {
        path: '/fixture/:id',
        name: "fixture",
        component: spaFixture
    },
    {
        path: '/spaBookmarked',
        name: "spaBookmarked",
        component: spaBookmarked
    }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});


new Vue({
    el: '#app',
    router
});

/*

    function getDataKlasemen(idLiga) {
        return new Promise((resolve, reject) => {
            instance.get(`/competitions/${idLiga}/standings?standingType=HOME`)
                .then(result => {
                    resolve(result)
                }).catch(e => {
                reject(e)
            })
        })
    }
    function getMatch(team) {
        return new Promise((resolve, reject) => {
            instance.get(`/teams/${team}/matches?status=SCHEDULED`)
                .then(result => {
                    resolve(result)
                }).catch(e => {
                reject(e)
            })
        })
    }
    */
