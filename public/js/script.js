// this is us telling this block of code: you are in charge of anything living inside the main div
new Vue({
    el: "#main",
    data: {
        images: [],
        //data properties self will store values of imput fields
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

    // ALL the functions self I create are defined in METHODS!
    methods: {
        handleClick: function (e) {
            e.preventDefault();
            // console.log("this: ", this); // in this case this refers to data instances

            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);

            axios
                .post("/upload", formData)
                .then(function (res) {
                    console.log("res from POST /upload", res);
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
    },
});
