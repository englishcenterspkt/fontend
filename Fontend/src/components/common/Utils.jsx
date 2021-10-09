import {storage} from "./firebase/Config";

export function handleInput(event) {
    this.setState({ [event.target.id]: event.target.value });
}

export function parseDate(timestamp) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(timestamp);
}

export function getKeyByValue(map, object) {
    return Object.keys(map).find((i) => map[i] === object);
}

export function onChangePage(event) {
    this.state.current_page = event.target.attributes.value.value;
    this.reload();
}

export function previousPage() {
    this.state.current_page = this.state.previous_page;
    this.reload();
}

export function nextPage() {
    this.state.current_page = this.state.next_page;
    this.reload();
}

export function changeSize(event) {
    const s = event.target.attributes.value.value;
    this.state.current_page =
        parseInt(
            (this.state.current_page * this.state.size - (this.state.size - 1)) / s
        ) + 1;
    this.state.size = s;
    this.reload();
}

export function onSort(event) {
    this.state.is_asc = !this.state.is_asc;
    this.state.field = event.target.innerText;
    this.reload();
}

export function getPageShow() {
    if (this.state.current_page - 2 < 1) {
        return range(1, this.state.total_pages > 5 ? 5 : this.state.total_pages);
    }
    if (this.state.current_page + 2 > this.state.total_pages) {
        return range(
            this.state.total_pages - 5 > 1 ? this.state.total_pages - 4 : 1,
            this.state.total_pages
        );
    }
    return range(this.state.current_page - 2, this.state.current_page + 2);
}

export function showAdd() {
    this.setState({ show_add: !this.state.show_add, item: this.props.item });
}

export function showEdit(event) {
    this.setState({
        item: JSON.parse(event.currentTarget.getAttribute("data-item")),
        show_add: !this.state.show_add,
    });
}

export function getImageURL() {
    if (this.props.url !== null) {
        storage
            .ref("images/" + this.props.url)
            .getMetadata()
            .then((Response) => {
                if (Response.contentType === "image/png") {
                    this.setState({
                        url:
                            "https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2F" +
                            this.props.url +
                            "?alt=media&token=" +
                            Response.md5Hash,
                    });
                } else {
                    this.setState({
                        url: "https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Favatar-1.png?alt=media&token=1e9f3c81-c00e-40fb-9be1-6b292d0582c6",
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    url: "https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Favatar-1.png?alt=media&token=1e9f3c81-c00e-40fb-9be1-6b292d0582c6",
                });
            });
    } else {
        this.setState({
            url: "https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Favatar-1.png?alt=media&token=1e9f3c81-c00e-40fb-9be1-6b292d0582c6",
        });
    }
}

function range(a, b) {
    const result = [];
    for (var i = a; i <= b; i++) {
        result.push(i);
    }
    return result;
}
