let spaTeam = Vue.component('spaTeam',
    {
        template: `
            <div>
                <gobackcomponent></gobackcomponent>

    <div class="card pad center">
            <img :src="TeamData.crestUrl" class="circle responsive-img image-team" :alt="TeamData.name" @error="imageHandling">
            <h3>{{TeamData.name}}</h3>
            <div class="row">
                <div class="col-6">
                <p>Address : {{TeamData.address}}</p>
                <p>Phone : {{TeamData.phone}}</p>
                 <p>website : {{TeamData.website}}</p>
                </div>
                <div class="col-6">
                <p>Email : {{TeamData.email}}</p>
                <p>founded : {{TeamData.founded}}</p>
                <p>venue : {{TeamData.venue}}</p>
                </div>
            </div>
        </div>

            </div>
            `,
        data() {
            return {
                TeamData: null

            }
        },
        components: {
            gobackcomponent
        },
        created() {
            let that = this;
            let team = that.$route.params;
            that.TeamData = team;
            that.getData(team);
        },
        methods: {
            getData(team) {
                let that = this;
                let loaderOverlay = document.getElementById("loaderOverlay");
                loaderOverlay.classList.add("showLoader");
                instance.get(`/teams/${team.id}`)
                    .then(result => {
                        that.TeamData = result.data
                    }).catch(e => {
                    that.TeamData = null;
                    M.toast({html: `Error connection `, classes: 'rounded'});
                    router.push({name: 'home'})
                }).finally(x=>{
                    loaderOverlay.classList.remove("showLoader");
                })
            },
            imageHandling(err){
                err.target.src = '../../img/favicon.ico';
            },
        },
        mounted() {
            // for offline mockup
            //this.TeamData = team;
        },

    }
);
