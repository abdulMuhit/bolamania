let spaBookmarked = Vue.component('spaBookmarked',
    {
        template: `
<div>
  <gobackcomponent></gobackcomponent>
  <div class="container">
  <div class="card">
    <div class="card-header">
      <button class="pull-right waves-effect red lighten-3 btn" title="Clear" @click="delAllBookmark()"><i class="material-icons left">clear_all</i></button>
    </div>
  <div class="card-body">
<div class="card center">
  <h3>Fixtures Bookmarked</h3>
  <div v-for="(mat, key) in spaBokmarked" class="card center" :key="key">
        <div class="row">
            <div class="col 12 center">
            <p>Date: {{mat.utcDate}} 
                <button class="pull-right waves-effect red lighten-3 btn" title="delete" @click="delBookmark(mat)"><i class="material-icons left">delete</i></button>
                </p>
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
  
</div>
  
<div class="container">
              
</div>
</div>
`,
        name: "spaBookmarked",
        data() {
            return {
                spaBokmarked: null
            }
        },
        components: {
            gobackcomponent
        },
        methods: {
            getData() {
                let that = this;
                getAllDataBookmarked().then(res=>{
                    that.spaBokmarked = res;
                }).catch(e=>{
                    M.toast({html: `Error `, classes: 'rounded'});
                });

            },
            delBookmark(mat){
                let that = this;
                M.toast({html: `bookmarked delete ${mat.status}`, classes: 'rounded'});
                deleteKey(mat.id).then(x=>{
                    that.getData();
                });
            },
            delAllBookmark(){
                let that = this;
                clearDb().then(x=>{
                    M.toast({html: `bookmarked Cleared`, classes: 'rounded'});
                    that.getData()
                }).catch(e=>{
                    console.log("error ", e);
                    M.toast({html: `Error `, classes: 'rounded'});
                });
            }
        },
        mounted() {
            let that = this;
            that.getData()
        },

    }
)
