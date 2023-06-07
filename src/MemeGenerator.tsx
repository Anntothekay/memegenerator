import { useState, ChangeEvent, useEffect, useRef } from "react";

const MemeGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(32);
  const [fontColor, setFontColor] = useState<string>("#ffffff");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [imageFormat, setImageFormat] = useState<string>("jpeg");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const imageElement = new Image();
        imageElement.src = image;
        imageElement.onload = () => {
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;
          context.drawImage(
            imageElement,
            0,
            0,
            imageElement.width,
            imageElement.height
          );

          context.font = `${fontSize}px ${fontFamily}`;
          context.fillStyle = fontColor;
          context.textAlign = "center";

          const topTextPosition = canvas.height * 0.1 + fontSize / 2;
          const bottomTextPosition = canvas.height * 0.9 + fontSize / 2;
          context.fillText(topText, canvas.width / 2, topTextPosition);
          context.fillText(bottomText, canvas.width / 2, bottomTextPosition);
        };
      }
    }
  }, [
    imageFormat,
    canvasRef,
    image,
    topText,
    bottomText,
    fontSize,
    fontColor,
    fontFamily,
  ]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];
      setImage(URL.createObjectURL(uploadedImage));
    }
  };

  const handleTopTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBottomText(event.target.value);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL(`image/${imageFormat}`);
      link.download = `meme.${imageFormat}`;
      link.click();
    }
  };

  const handleImageFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setImageFormat(event.target.value);
  };

  return (
    <div>
      <h1>Meme Generator</h1>

      <div className="upload">
        <label htmlFor="imageUpload">Upload Image: </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {image && (
        <>
          <hr />
          <div className="content">
            <div className="form">
              <h2>Generate:</h2>
              <div>
                <label htmlFor="topText">Top Text: </label>
                <input
                  type="text"
                  id="topText"
                  value={topText}
                  onChange={handleTopTextChange}
                />
              </div>
              <div>
                <label htmlFor="bottomText">Bottom Text: </label>
                <input
                  type="text"
                  id="bottomText"
                  value={bottomText}
                  onChange={handleBottomTextChange}
                />
              </div>

              <div>
                <label htmlFor="fontSize">Font Size: </label>
                <input
                  type="number"
                  id="fontSize"
                  value={fontSize}
                  onChange={(event) => setFontSize(Number(event.target.value))}
                />
              </div>

              <div>
                <label htmlFor="fontColor">Font Color: </label>
                <input
                  type="color"
                  id="fontColor"
                  value={fontColor}
                  onChange={(event) => setFontColor(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="fontFamily">Font Family: </label>
                <select
                  id="fontFamily"
                  value={fontFamily}
                  onChange={(event) => setFontFamily(event.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Pacifico">Pacifico</option>
                </select>
              </div>
              <div>
                <label htmlFor="imageFormat">Image Format: </label>
                <select
                  id="imageFormat"
                  value={imageFormat}
                  onChange={handleImageFormatChange}
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              <button onClick={handleDownload}>Download Meme</button>
            </div>

            <div className="canvas">
              <h2>Preview:</h2>
              <canvas
                ref={canvasRef}
                width={canvasRef.current?.width}
                height={canvasRef.current?.height}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemeGenerator;
