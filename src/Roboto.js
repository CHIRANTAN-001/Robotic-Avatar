import React from "react";
import { useState } from "react";

let APIurl = "https://robohash.org";

const Roboto = () => {
  // YOUR CODE HERE
  const [userInput, setUserInput] = useState("");
  const [imagesUrl, setImagesUrl] = useState([]);

  function handleInpChange(evt) {
    let text = evt.target.value;
    setUserInput(text);
  }

  async function fetchImg() {
    let url = `${APIurl}/${userInput}`;
    let response = await fetch(url);
    let imgBlog = await response.blob();
    let imgUrl = URL.createObjectURL(imgBlog);
    return imgUrl;
  }

  function handleGenerate(evt) {
    fetchImg().then((url) => {
      setImagesUrl([...imagesUrl, { url, userInput }]);
    });
  }
  function removeImg(imageToRemove, index) {
    let filteredImgs = imagesUrl.filter((img, index) => {
      return img.url !== imageToRemove.url;
    });
    setImagesUrl([...filteredImgs]);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="center">
            <div className="col-12 col-lg-4 logo">
            </div>
            <div className="col-12 col-lg-4 mt-4 text-center">
              <h1 className="logo">Robotic</h1>
              <div className="input-group mb-3  p-3 ">
                <input
                  type="text"
                  className="form-control input-1"
                  placeholder={"Generate Your Robot Avatar"}
                  onChange={handleInpChange}
                  value={userInput}
                />
                <button
                  type="submit"
                  className="btn btn-lg"
                  onClick={handleGenerate}
                >
                  <i class="bi bi-robot"></i>
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-4"></div>
          </div>
        </div>

        <div className="robo  row">
          {imagesUrl.map((img, index) => (
            <div
              className="circle col-6 col-md-4 col-lg-3 my-3 "
              key={`${img.url + img.userInput}`}
              onClick={() => {
                removeImg(img, index);
              }}
            >
              <figure className="fig">
                <img
                  src={img.url}
                  className="fig-img my-4"
                  width="100%"
                  height="100%"
                />
                <figcaption className="name  text-white">
                  <h5>Avatar : {img.userInput}</h5>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Roboto;