let gobackcomponent = Vue.component('gobackComp', {
    template: `
        <div class="nav-content teal lighten-1">
            <a @click="$router.go(-1)" class="btn-floating btn-large waves-effect waves-light blue darken-1" title="back"><i class="material-icons">arrow_back</i></a>
        </div>`
});
