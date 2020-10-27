// this is us telling this block of code: you are in charge of anything living inside the main div
new Vue({
    el: "#main",
    data: {
        images: [],
    },
    mounted: function () {
        let that = this;
        axios.get("/images").then(function (response) {
            that.images = response.data;
        });
    },
    methods: {},
});
