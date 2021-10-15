import React from "react";

function ImageUpload(props) {
    function handleImageChange(e) {
        e.preventDefault();
        if (e.target.files.length > 0) {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    image: file,
                    url: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="text-center">
            <label htmlFor="up-image-0" className="col-6">
                <img
                    id="img-upload-0"
                    alt="avatar"
                    className="img-thumbnail"
                    src={props.url}
                />
            </label>
            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input"
                    id="up-image-0"
                    name="up-image-0"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
}

export default ImageUpload;
