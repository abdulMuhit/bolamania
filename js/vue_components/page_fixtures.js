let spaFixture = Vue.component('spaFixture', {
        template: `
<div>
  <gobackcomponent></gobackcomponent>
<div class="container">

<div class="card center">
  <h3>Fixtures</h3>
  <div v-for="(mat, key) in spaFixture" class="card center" :key="key">
        <div class="row">
            <div class="col 12 center">
            <p>Date: {{mat.utcDate}} <button class="pull-right waves-effect btn" title="bookmark" @click="bookmark(mat)"><i class="material-icons left">bookmark</i></button></p>
            </div>
        </div>
        <div class="row">
            <div class="col 4">{{mat.homeTeam.name}}</div>
            <div class="col 2">VS</div>
            <div class="col 4">{{mat.awayTeam.name}}</div>

        </div>
    </div>

</div>


</div>
</div>
`,
        data() {
            return {
                spaFixture: null
            }
        },
        components: {
            gobackcomponent
        },
        methods: {
            getData(team) {
                let that = this;
                let loaderOverlay = document.getElementById("loaderOverlay");
                loaderOverlay.classList.add("showLoader");
                instance.get(`/teams/${team.id}/matches?status=SCHEDULED`)
                    .then(result => {
                        that.spaFixture = result.data.matches;
                    }).catch(e => {
                    that.spaFixture = null;
                    M.toast({html: `Error connection `, classes: 'rounded'});
                    router.push({name: 'home'})
                }).finally(()=>{
                    loaderOverlay.classList.remove("showLoader");
                })
            },
            bookmark(mat){
                // 'rounded' is the class I'm applying to the toast
                M.toast({html: `bookmarked ${mat.status}`, classes: 'rounded'});
                addData(mat, mat.id);
            }
        },
        created() {
/*            let that = this
            let param = that.$route.params
            that.getData(param);*/

        },
        mounted() {
            let that = this;
            let param = that.$route.params
            that.getData(param);

            //for offline mockup
            //that.spaFixture = fixture.matches
        },

    }
)
