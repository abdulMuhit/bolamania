let spaAbout = Vue.component('spaAbout', {
    template: `

<div class="container">
<div class="row">
    <div class="col s12 m12 l16">
        <div class="card pad center">
            <img src="../../img/fantaseen.png" class="circle responsive-img center-align" alt="fantaseen">
            <h3>Fantaseen news</h3>
            <p>Bola Mania adalah unit baru dari fantaseen.</p>
            <p>Di sini kami mengupas tuntas berita tentang sepakbola.</p>
        </div>
    </div>
</div>

<div class="row">
    <div class="col s12 m12 l16">
        <div class="card pad center">
            <img src="../../img/abdulmuhit.jpg" class="circle responsive-img" alt="">
            <h3>Hubungi Saya</h3>
            <p>Hubungi saya melalui email abdul.muhit.t@gmail.com</p>
        </div>
    </div>
</div>


</div>

`,
    name: "about",
    data() {
        return {
            someData: "SPA ABOUT"
        }
    }
})
