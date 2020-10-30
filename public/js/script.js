// this is us telling this block of code: you are in charge of anything living inside the main div
Vue.component("my-component", {
    props: ["imageId"],

    template: "#myModal",
    data: function () {
        return {
            image: "",
            comments: [],
            comment: "",
            username: "",
        };
    },

    methods: {
        closeMyModal: function () {
            console.log("it closes");
            this.$emit("close");
        },
    },

    mounted: function () {
        let self = this;
        axios
            .get("/imageId/" + this.imageId)
            .then(function (response) {
                self.image = response.data[0];
            })
            .catch(function (err) {
                console.log("error with axios", err);
            });
    },
});

new Vue({
    el: "#main",
    data: {
        imageId: null,
        images: [],
        title: " ",
        description: " ",
        username: " ",
        file: null,
    },
    mounted: function () {
        let self = this;
        axios.get("/images").then(function (response) {
            self.images = response.data;
        });
    },

    methods: {
        handleClick: function (e) {
            e.preventDefault();
            // console.log("this: ", this); // in this case this refers to data instances

            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);

            let self = this;

            axios
                .post("/upload", formData)
                .then(function (res) {
                    console.log("res from POST /upload", res.data.rows[0]);
                    self.images.unshift(res.data.rows[0]);
                })
                .catch(function (err) {
                    console.log("err in POST /upload", err);
                });
        },

        handleChange: function (e) {
            console.log("handleChange is running!");
            console.log("file: ", e.target.files[0]);
            this.file = e.target.files[0];
        },

        closeMePlease: function () {
            console.log("closeMePlease is working");
            this.imageId = null;
        },

        openModal: function (id) {
            console.log("openModal is running!!");
            this.imageId = id;
            console.log("id: ", id);
        },
    },
});
