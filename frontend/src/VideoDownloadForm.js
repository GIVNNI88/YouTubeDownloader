import React, { useState } from "react";
import axios from "axios";

function VideoDownloadForm() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/download/", {
        url: url,
        checkBox: checkBox,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error downloading video.");
    }
  };

  return (
    <div className="form__group">
      <h1>YouTube Downloader</h1>
      <div className="form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="form__input"
        />

        <div class="checkbox-wrapper-22">
          <div className="mp3">MP3</div>
          <label class="switch" for="checkbox">
            <input
              type="checkbox"
              value={true}
              id="checkbox"
              onChange={(e) => setCheckBox(e.target.value)}
            />
            <div class="slider round"></div>
          </label>
        </div>

        <button onClick={handleDownload}>Download</button>
      </div>

      <div className="massage">{message}</div>
    </div>
  );
}

export default VideoDownloadForm;
